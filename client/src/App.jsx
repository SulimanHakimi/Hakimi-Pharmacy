import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';
import About from './pages/About';
import Header from './components/header';
import Footer from './components/footer';
import ContactPage from './pages/Contact';
import BlogPage from './pages/Blog';
import SingleBlogPage from './pages/SingleBlog';
import ShopPage from './pages/Shop';
import ProfilePage from './pages/Profile';
import PaymentPage from './pages/Paymentform';
import CartPage from './pages/Cart';
import SuccessPage from './pages/Success';


export default function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account' element={<ProfilePage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/shop' element={<ShopPage />} />
                <Route path='/blog' element={<BlogPage />} />
                <Route path='/blog/post/:id' element={<SingleBlogPage    />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<ContactPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/success/:id" element={<SuccessPage />} />
                <Route path='/*' element={<Home />} />
            </Routes>
            <Footer/>
        </Router>
    );
}
