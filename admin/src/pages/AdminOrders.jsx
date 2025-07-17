import React, { useState, useEffect } from "react";
import { getRequest, putRequest, deleteRequest } from "../RequestMethods";

// Status options for consistency and easier maintenance
const STATUS_OPTIONS = [
  { value: "در انتظار بررسی", label: "در انتظار" },
  { value: "تایید شد", label: "تایید شده" },
  { value: "ارسال شد", label: "ارسال شده" },
  { value: "تحویل داده شد", label: "تحویل داده شده" },
  { value: "لغو شد", label: "لغو شده" },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // id of order being updated/deleted
  const [error, setError] = useState(null);

  // Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getRequest("orders");
      // Defensive: handle both array and object with .orders
      const ordersArr = Array.isArray(response)
        ? response
        : Array.isArray(response?.orders)
        ? response.orders
        : [];
      setOrders(ordersArr);
    } catch (err) {
      setError("خطا در دریافت سفارشات.");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  // Update order status
  const handleStatusUpdate = async (id, status, email) => {
    setActionLoading(id + "-status");
    setError(null);
    try {
      const response = await putRequest(`orders/${id}`, {
        status,
        email,
      });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: response.status || status } : order
        )
      );
    } catch (err) {
      setError("خطا در بروزرسانی وضعیت سفارش.");
      console.error("Error updating order status:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete order
  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این سفارش مطمئن هستید؟")) return;
    setActionLoading(id + "-delete");
    setError(null);
    try {
      await deleteRequest(`orders/${id}`);
      setOrders((prev) => prev.filter((order) => order._id !== id));
      if (selectedOrder && selectedOrder._id === id) setSelectedOrder(null);
    } catch (err) {
      setError("خطا در حذف سفارش.");
      console.error("Error deleting order:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // View order details
  const viewDetails = async (id) => {
    setActionLoading(id + "-details");
    setError(null);
    try {
      const response = await getRequest(`orders/details/${id}`);
      setSelectedOrder(response);
    } catch (err) {
      setError("خطا در دریافت جزئیات سفارش.");
      console.error("Error fetching order details:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // Helper for status color
  const getStatusColor = (status) => {
    switch (status) {
      case "تحویل داده شد":
        return "bg-green-100";
      case "لغو شد":
        return "bg-red-100";
      case "ارسال شد":
        return "bg-blue-100";
      case "تایید شد":
        return "bg-yellow-100";
      default:
        return "";
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">مدیریت سفارشات</h1>

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-right">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <svg className="animate-spin h-8 w-8 text-green-500 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-lg text-gray-700">در حال بارگذاری...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">هیچ سفارشی یافت نشد.</div>
      ) : (
        <>
          {/* Table layout for large screens */}
          <div className="hidden lg:block w-full overflow-x-auto bg-white p-4 rounded-lg shadow-md">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-right">ایدی سفارش</th>
                  <th className="p-3 text-right">کاربر</th>
                  <th className="p-3 text-right">تعداد اقلام</th>
                  <th className="p-3 text-right">مجموع قیمت</th>
                  <th className="p-3 text-right">وضعیت</th>
                  <th className="p-3 text-right">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className={`${getStatusColor(order.status)} border-b`}
                  >
                    <td className="p-3 font-mono text-xs">{order._id}</td>
                    <td className="p-3">{order.user?.name || "N/A"}</td>
                    <td className="p-3">{order.items?.length ?? 0}</td>
                    <td className="p-3">{order.totalPrice?.toFixed(2) ?? "0.00"} AFN</td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            order._id,
                            e.target.value,
                            order.shippingAddress?.email
                          )
                        }
                        className="p-2 border border-gray-300 rounded-lg"
                        disabled={actionLoading === order._id + "-status"}
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3 flex flex-row gap-2">
                      <button
                        onClick={() => viewDetails(order._id)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                        disabled={actionLoading === order._id + "-details"}
                      >
                        {actionLoading === order._id + "-details" ? "..." : "جزئیات"}
                      </button>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="text-red-600 hover:text-red-800"
                        disabled={actionLoading === order._id + "-delete"}
                      >
                        {actionLoading === order._id + "-delete" ? "..." : "حذف"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for smaller screens */}
          <div className="lg:hidden space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`${getStatusColor(order.status)} p-4 rounded-lg shadow-md`}
              >
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">ایدی سفارش:</span>{" "}
                    <span className="font-mono text-xs">{order._id}</span>
                  </p>
                  <p>
                    <span className="font-semibold">کاربر:</span>{" "}
                    {order.user?.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">تعداد اقلام:</span>{" "}
                    {order.items?.length ?? 0}
                  </p>
                  <p>
                    <span className="font-semibold">مجموع قیمت:</span>{" "}
                    {order.totalPrice?.toFixed(2) ?? "0.00"} AFN
                  </p>
                  <p>
                    <span className="font-semibold">وضعیت:</span>{" "}
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(
                          order._id,
                          e.target.value,
                          order.shippingAddress?.email
                        )
                      }
                      className="p-2 border border-gray-300 rounded-lg"
                      disabled={actionLoading === order._id + "-status"}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </p>
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => viewDetails(order._id)}
                      className="text-blue-600 hover:text-blue-800"
                      disabled={actionLoading === order._id + "-details"}
                    >
                      {actionLoading === order._id + "-details" ? "..." : "جزئیات"}
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-600 hover:text-red-800"
                      disabled={actionLoading === order._id + "-delete"}
                    >
                      {actionLoading === order._id + "-delete" ? "..." : "حذف"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal for order details */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute left-4 top-4 text-gray-400 hover:text-gray-700 text-2xl"
              aria-label="بستن"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">جزئیات سفارش</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">شناسه سفارش:</span>{" "}
                  <span className="font-mono text-xs">{selectedOrder._id}</span>
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">کاربر:</span>{" "}
                  {selectedOrder.user?.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">ایمیل:</span>{" "}
                  {selectedOrder.shippingAddress?.email || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">تاریخ ایجاد:</span>{" "}
                  {selectedOrder.createdAt
                    ? new Date(selectedOrder.createdAt).toLocaleString("fa-AF")
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">وضعیت:</span>{" "}
                  {selectedOrder.status}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">اقلام سفارش</h3>
                <ul className="space-y-2">
                  {selectedOrder.items?.length > 0 ? (
                    selectedOrder.items.map((item, idx) => (
                      <li key={item.product || idx} className="flex justify-between">
                        <p>{item.title}</p>
                        <p>
                          {item.quantity} × AFN{item.price?.toFixed(2) ?? "0.00"}
                        </p>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400">هیچ موردی وجود ندارد.</li>
                  )}
                </ul>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">مجموع قیمت:</span>{" "}
                  AFN{selectedOrder.totalPrice?.toFixed(2) ?? "0.00"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">آدرس ارسال</h3>
                <p className="text-gray-700">
                  {selectedOrder.shippingAddress?.street || ""}
                </p>
                <p className="text-gray-700">
                  {selectedOrder.shippingAddress?.city || ""}
                  {selectedOrder.shippingAddress?.postalCode
                    ? `, ${selectedOrder.shippingAddress.postalCode}`
                    : ""}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
