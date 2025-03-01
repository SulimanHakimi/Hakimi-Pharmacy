import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaPills,
  FaBox,
  FaFileMedical,
  FaShoppingCart,
} from "react-icons/fa";

const AdminHome = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <Link
            to="/"
            className="flex items-center p-3 text-gray-700 hover:bg-gray-200"
          >
            <FaHome className="mr-2" />
            Dashboard
          </Link>
          <Link
            to="/orders"
            className="flex items-center p-3 text-gray-700 hover:bg-gray-200"
          >
            <FaShoppingCart className="mr-2" />
            Orders
          </Link>
          <Link
            to="/users"
            className="flex items-center p-3 text-gray-700 hover:bg-gray-200"
          >
            <FaUser className="mr-2" />
            Users
          </Link>
          <Link
            to="/products"
            className="flex items-center p-3 text-gray-700 hover:bg-gray-200"
          >
            <FaBox className="mr-2" />
            Products
          </Link>
          <Link
            to="/posts"
            className="flex items-center p-3 text-gray-700 hover:bg-gray-200"
          >
            <FaFileMedical className="mr-2" />
            Posts
          </Link>
          <Link
            to="/prescriptions"
            className="flex items-center p-3 text-gray-700 hover:bg-gray-200"
          >
            <FaFileMedical className="mr-2" />
            Prescriptions
          </Link>
        </nav>
      </div>

      <div className="flex-1 p-6">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminHome;