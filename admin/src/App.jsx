import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import AdminPrescriptions from "./pages/AdminPrescriptions";
import AdminBlog from "./pages/AdminPosts";
import AdminOrders from "./pages/AdminOrders";
import Login from "./pages/AdminLogin";
import { useSelector } from "react-redux";
import SideBar from "./components/sideBar";
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem("token");
  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SideBar />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="posts" element={<AdminBlog />} />
          <Route path="prescriptions" element={<AdminPrescriptions />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
