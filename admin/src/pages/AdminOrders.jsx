import React, { useState, useEffect } from "react";
import { getRequest, putRequest, deleteRequest } from "../RequestMethods";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getRequest("orders");
        setOrders(response.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id, status, email) => {
    try {
      const response = await putRequest(`orders/${id}`, {
        status: status,
        email: email,
      });
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status: response.status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRequest(`orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const viewDetails = async (id) => {
    try {
      const response = await getRequest(`orders/details/${id}`);
      setSelectedOrder(response);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">مدیریت سفارشات</h1>

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
              <tr key={order._id} className="border-b">
                <td className="p-3">{order._id}</td>
                <td className="p-3">{order.user?.name || "N/A"}</td>
                <td className="p-3">{order.items.length}</td>
                <td className="p-3">{order.totalPrice.toFixed(2)} AFN</td>
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusUpdate(
                        order._id,
                        e.target.value,
                        order.shippingAddress.email
                      )
                    }
                    className="p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="در انتظار برسی">در انتظار</option>
                    <option value="تایید شد">تایید شده</option>
                    <option value="ارسال شد">ارسال شده</option>
                    <option value="تحویل داده شد">تحویل داده شده</option>
                    <option value="لغو شد">لغو شده</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => viewDetails(order._id)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    جزئیات
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
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
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">ایدی سفارش:</span> {order._id}
              </p>
              <p>
                <span className="font-semibold">کاربر:</span>{" "}
                {order.user?.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold">تعداد اقلام:</span>{" "}
                {order.items.length}
              </p>
              <p>
                <span className="font-semibold">مجموع قیمت:</span>{" "}
                {order.totalPrice.toFixed(2)} AFN
              </p>
              <p>
                <span className="font-semibold">وضعیت:</span>{" "}
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusUpdate(
                      order._id,
                      e.target.value,
                      order.shippingAddress.email
                    )
                  }
                  className="p-2 border border-gray-300 rounded-lg"
                >
                  <option value="در انتظار برسی">در انتظار</option>
                  <option value="تایید شد">تایید شده</option>
                  <option value="ارسال شد">ارسال شده</option>
                  <option value="تحویل داده شد">تحویل داده شده</option>
                  <option value="لغو شد">لغو شده</option>
                </select>
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => viewDetails(order._id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  جزئیات
                </button>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">جزئیات سفارش</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">شناسه سفارش:</span>{" "}
                  {selectedOrder._id}
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
                  {new Date(selectedOrder.createdAt).toLocaleDateString()}
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
                  {selectedOrder.items.map((item) => (
                    <li key={item.product} className="flex justify-between">
                      <p>{item.title}</p>
                      <p>
                        {item.quantity} x AFN{item.price.toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">مجموع قیمت:</span> AFN
                  {selectedOrder.totalPrice.toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">آدرس ارسال</h3>
                <p className="text-gray-700">
                  {selectedOrder.shippingAddress.street}
                </p>
                <p className="text-gray-700">
                  {selectedOrder.shippingAddress.city},{" "}
                  {selectedOrder.shippingAddress.postalCode}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
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
