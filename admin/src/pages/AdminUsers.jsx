import React, { useState } from "react";
import { deleteRequest, getRequest } from "../RequestMethods";
import useCachedFetch from "../useCachedFetch";

const DEFAULT_AVATAR = "/logo.png";

const fetchUsers = async () => {
  const response = await getRequest("users");
  return Array.isArray(response)
    ? response
    : Array.isArray(response?.users)
    ? response.users
    : [];
};

const AdminUsers = () => {
  const { data: users = [], loading } = useCachedFetch(
    "admin_users",
    fetchUsers,
    { expiryMinutes: 60 } // cache for 1 hour
  );
  const [deleteLoading, setDeleteLoading] = useState(null); // user id being deleted
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [localUsers, setLocalUsers] = useState(null); // for immediate UI update after delete

  const displayedUsers = localUsers || users;

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این کاربر مطمئن هستید؟")) return;
    setDeleteLoading(id);
    setError(null);
    setSuccessMsg(null);
    try {
      await deleteRequest(`users/${id}`);
      const updatedUsers = displayedUsers.filter((user) => user._id !== id);
      setLocalUsers(updatedUsers);
      localStorage.setItem(
        "admin_users",
        JSON.stringify({ value: updatedUsers, timestamp: Date.now() })
      );
      setSuccessMsg("کاربر با موفقیت حذف شد.");
    } catch (err) {
      setError("خطا در حذف کاربر.");
      console.error("Error deleting user:", err);
    } finally {
      setDeleteLoading(null);
      setTimeout(() => setSuccessMsg(null), 2000);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">مدیریت کاربران</h1>

      {loading && (
        <div className="flex items-center justify-center h-32">
          <svg className="animate-spin h-8 w-8 text-green-500 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-lg text-gray-700">در حال بارگذاری...</span>
        </div>
      )}

      {error && (
        <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm text-right">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm text-right">
          {successMsg}
        </div>
      )}

      {!loading && displayedUsers.length === 0 && !error && (
        <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg text-center">
          هیچ کاربری یافت نشد.
        </div>
      )}

      {/* Table for larger screens */}
      {!loading && displayedUsers.length > 0 && (
        <div className="hidden lg:block bg-white p-6 rounded-lg shadow-md">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-right">نام</th>
                <th className="p-3 text-right">ایمیل</th>
                <th className="p-3 text-right">تصویر</th>
                <th className="p-3 text-right">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-3">{user.name || <span className="text-gray-400">-</span>}</td>
                  <td className="p-3">{user.email || <span className="text-gray-400">-</span>}</td>
                  <td className="p-3">
                    <img
                      src={user.picture || DEFAULT_AVATAR}
                      alt={user.name || "user"}
                      className="w-10 h-10 rounded-full object-cover border"
                      onError={(e) => (e.target.src = DEFAULT_AVATAR)}
                    />
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className={`text-red-600 hover:text-red-800 font-semibold transition disabled:opacity-50`}
                      disabled={deleteLoading === user._id}
                    >
                      {deleteLoading === user._id ? "در حال حذف..." : "حذف"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card layout for smaller screens */}
      {!loading && displayedUsers.length > 0 && (
        <div className="lg:hidden space-y-4">
          {displayedUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.picture || DEFAULT_AVATAR}
                  alt={user.name || "user"}
                  className="w-10 h-10 rounded-full object-cover border"
                  onError={(e) => (e.target.src = DEFAULT_AVATAR)}
                />
                <div className="flex-1">
                  <p className="font-semibold">{user.name || <span className="text-gray-400">-</span>}</p>
                  <p className="text-sm text-gray-600">{user.email || <span className="text-gray-400">-</span>}</p>
                </div>
                <button
                  onClick={() => handleDelete(user._id)}
                  className={`text-red-600 hover:text-red-800 font-semibold transition disabled:opacity-50`}
                  disabled={deleteLoading === user._id}
                >
                  {deleteLoading === user._id ? "در حال حذف..." : "حذف"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;