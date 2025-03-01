import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState(0);
  const [post, setPost] = useState(0);
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, postsResponse, ordersResponse, productsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/users"),
          axios.get("http://localhost:5000/api/blogs"),
          axios.get("http://localhost:5000/api/orders"),
          axios.get("http://localhost:5000/api/products"),
        ]);

        setUsers(usersResponse.data.length);
        setPost(postsResponse.data.length);
        setOrders(ordersResponse.data.orders.length);
        setProducts(productsResponse.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">{users}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">Total Medicines</h2>
          <p className="text-3xl font-bold text-green-600">{products}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">Total Orders</h2>
          <p className="text-3xl font-bold text-purple-600">{orders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">Total Blogs</h2>
          <p className="text-3xl font-bold text-purple-600">{post}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;