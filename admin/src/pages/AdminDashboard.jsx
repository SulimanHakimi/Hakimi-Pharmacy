import React, { useEffect, useState } from "react";
import { getRequest } from "../RequestMethods";

const STAT_CARDS = [
  {
    key: "users",
    label: "کاربران",
    color: "text-blue-600",
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m9-4.13a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" />
      </svg>
    ),
  },
  {
    key: "products",
    label: "دواها",
    color: "text-green-600",
    icon: (
      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 3v18m9-9H3" />
      </svg>
    ),
  },
  {
    key: "orders",
    label: "سفارشات",
    color: "text-purple-600",
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 7h18M3 7l1.5 12.5A2 2 0 0 0 6.5 21h11a2 2 0 0 0 2-1.5L21 7M16 10a4 4 0 1 1-8 0" />
      </svg>
    ),
  },
  {
    key: "posts",
    label: "پست ها",
    color: "text-pink-600",
    icon: (
      <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
        <path d="M9 7h6M9 11h6M9 15h2" />
      </svg>
    ),
  },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    orders: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersResponse, postsResponse, ordersResponse, productsResponse] =
          await Promise.all([
            getRequest("users"),
            getRequest("blogs"),
            getRequest("orders"),
            getRequest("products"),
          ]);

        // Defensive checks for API response structure
        const usersCount = Array.isArray(usersResponse) ? usersResponse.length : 0;
        const postsCount = Array.isArray(postsResponse) ? postsResponse.length : 0;
        const ordersCount =
          ordersResponse && Array.isArray(ordersResponse.orders)
            ? ordersResponse.orders.length
            : Array.isArray(ordersResponse)
            ? ordersResponse.length
            : 0;
        const productsCount = Array.isArray(productsResponse) ? productsResponse.length : 0;

        if (isMounted) {
          setStats({
            users: usersCount,
            posts: postsCount,
            orders: ordersCount,
            products: productsCount,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) setError("دریافت اطلاعات با خطا مواجه شد.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg className="animate-spin h-8 w-8 text-green-500 mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <span className="text-lg text-gray-700">در حال بارگذاری...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg shadow">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-right">داشبورد مدیریت</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAT_CARDS.map((card) => (
          <div
            key={card.key}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transition-transform hover:scale-105"
          >
            <div className="mb-2">{card.icon}</div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{card.label}</h2>
            <p className={`text-3xl font-bold ${card.color}`}>
              {stats[card.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;