import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import About from "./pages/About";
import Header from "./components/header";
import ContactPage from "./pages/Contact";
import BlogPage from "./pages/Blog";
import SingleBlogPage from "./pages/SingleBlog";
import ShopPage from "./pages/Shop";
import ProfilePage from "./pages/Profile";
import PaymentPage from "./pages/Paymentform";
import CartPage from "./pages/Cart";
import SuccessPage from "./pages/Success";
import LoginSuccess from "./pages/LoginSuccess";
import NotFoundPage from "./pages/NotFound";
import CategoryPage from "./pages/CatagoryShop";
import HomePage from "./pages/Home";

const AppContent = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/success" element={<LoginSuccess />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:cat" element={<CategoryPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/post/:id" element={<SingleBlogPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success/:id" element={<SuccessPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
