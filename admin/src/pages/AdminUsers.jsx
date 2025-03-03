import React, { useState, useEffect } from "react";
import { deleteRequest, getRequest } from "../RequestMethods";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getRequest("users");
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRequest(`users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">مدیریت کاربران</h1>

      {/* Table for larger screens */}
      <div className="hidden lg:block bg-white p-6 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">نام</th>
              <th className="p-3 text-left">ایمیل</th>
              <th className="p-3 text-left">تصویر</th>
              <th className="p-3 text-left">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for smaller screens */}
      <div className="lg:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.picture}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={() => handleDelete(user._id)}
                className="text-red-600 hover:text-red-800"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;