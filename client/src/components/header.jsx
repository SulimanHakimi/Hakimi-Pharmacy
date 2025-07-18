import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const cartQuantity = useSelector((state) => state.cart.cartItems.length);
  const user = useSelector((state) => state?.user?.user?.user);

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto px-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-green-600 flex items-center">
          <Link to="/">
            <img
              src={logo}
              alt="Pharmacy Logo"
              className="h-14 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
            خانه
          </Link>
          <div
            className="relative group"
            onMouseEnter={() => setShopDropdown(true)}
            onMouseLeave={() => setShopDropdown(false)}
          >
            <Link to="/shop" className="text-gray-700 hover:text-green-600 font-medium transition-colors flex items-center">
              خرید
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </Link>
            {/* Dropdown */}
            <ul className={`absolute left-0 top-full bg-white shadow-lg rounded-lg py-2 w-48 mt-2 transition-all duration-200 ${shopDropdown ? 'block' : 'hidden'}`}>
              <li>
                <Link to="/shop/general-medicines" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">دواهای عمومی</Link>
              </li>
              <li>
                <Link to="/shop/herbal-medicines" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">دواهای گیاهی</Link>
              </li>
              <li>
                <Link to="/shop/skincare-products" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">محصولات پوستی</Link>
              </li>
              <li>
                <Link to="/shop/nutritional-supplements" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">مکمل‌های غذایی</Link>
              </li>
            </ul>
          </div>
          <Link to="/blog" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
            بلاگ
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
            تماس
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
            درباره
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Cart */}
          <Link to="/cart" className="relative text-gray-700 hover:text-green-600 transition-colors">
            {/* Shopping cart SVG */}
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs font-bold min-w-[18px] text-center">
                {cartQuantity}
              </span>
            )}
          </Link>
          {/* User */}
          {user ? (
            <Link to="/account" className="flex items-center">
              <img className="w-10 h-10 rounded-full border-2 border-green-600 object-cover" src={user.picture} alt="User" />
            </Link>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium transition-colors">ورود</Link>
          )}
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded hover:bg-green-50 focus:outline-none"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            {/* Hamburger SVG */}
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-40 transition-opacity duration-200 ${drawerOpen ? 'block' : 'hidden'}`}
        onClick={() => setDrawerOpen(false)}
      ></div>
      <nav
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-green-600 text-lg">منو</span>
          <button onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-2">
          <li>
            <Link to="/" className="block py-2 px-2 rounded hover:bg-green-50 text-gray-700" onClick={() => setDrawerOpen(false)}>
              خانه
            </Link>
          </li>
          <li>
            <div className="relative">
              <button
                className="w-full text-left py-2 px-2 rounded hover:bg-green-50 text-gray-700 flex items-center justify-between"
                onClick={() => setShopDropdown((prev) => !prev)}
              >
                خرید
                <svg className={`w-4 h-4 ml-1 transform transition-transform ${shopDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <ul className={`bg-white shadow rounded-lg mt-1 ${shopDropdown ? 'block' : 'hidden'}`}>
                <li>
                  <Link to="/shop/general-medicines" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600" onClick={() => setDrawerOpen(false)}>دواهای عمومی</Link>
                </li>
                <li>
                  <Link to="/shop/herbal-medicines" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600" onClick={() => setDrawerOpen(false)}>دواهای گیاهی</Link>
                </li>
                <li>
                  <Link to="/shop/skincare-products" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600" onClick={() => setDrawerOpen(false)}>محصولات پوستی</Link>
                </li>
                <li>
                  <Link to="/shop/nutritional-supplements" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600" onClick={() => setDrawerOpen(false)}>مکمل‌های غذایی</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="/blog" className="block py-2 px-2 rounded hover:bg-green-50 text-gray-700" onClick={() => setDrawerOpen(false)}>
              بلاگ
            </Link>
          </li>
          <li>
            <Link to="/contact" className="block py-2 px-2 rounded hover:bg-green-50 text-gray-700" onClick={() => setDrawerOpen(false)}>
              تماس
            </Link>
          </li>
          <li>
            <Link to="/about" className="block py-2 px-2 rounded hover:bg-green-50 text-gray-700" onClick={() => setDrawerOpen(false)}>
              درباره
            </Link>
          </li>
          <li>
            <Link to="/cart" className="block py-2 px-2 rounded hover:bg-green-50 text-gray-700 flex items-center" onClick={() => setDrawerOpen(false)}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              سبد خرید
              {cartQuantity > 0 && (
                <span className="ml-2 bg-red-600 text-white rounded-full px-1 text-xs font-bold min-w-[18px] text-center">
                  {cartQuantity}
                </span>
              )}
            </Link>
          </li>
          <li>
            {user ? (
              <Link to="/account" className="flex items-center py-2 px-2 rounded hover:bg-green-50" onClick={() => setDrawerOpen(false)}>
                <img className="w-8 h-8 rounded-full border-2 border-green-600 object-cover" src={user.picture} alt="User" />
                <span className="ml-2 text-gray-700">پروفایل</span>
              </Link>
            ) : (
              <Link to="/login" className="block py-2 px-2 rounded hover:bg-green-50 text-gray-700" onClick={() => setDrawerOpen(false)}>
                ورود
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
