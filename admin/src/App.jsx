import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminHome from "./pages/home";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import AdminPrescriptions from "./pages/AdminPrescriptions";
import AdminBlog from "./pages/AdminPosts";
import AdminOrders from "./pages/AdminOrders";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminHome />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="posts" element={<AdminBlog />} />
          <Route path="prescriptions" element={<AdminPrescriptions />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;