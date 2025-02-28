import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart, removeFromCart } from "../redux/cartActions";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce(
    (total, item) => total + parseInt(item.price) * item.quantity,
    0
  );

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) return;

    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );

    dispatch(updateCart(updatedCart));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8 text-gray-800">
          سبد خرید
        </h2>

        <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg mb-8">
          {cartItems.length > 0 ? (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between"
                >
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <p className="text-lg font-semibold text-gray-700">
                      {item.title}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item._id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
                    >
                      -
                    </button>
                    <span className="text-lg text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-semibold text-gray-700">
                      {parseInt(item.price) * item.quantity} AFN
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-600 hover:text-red-700 cursor-pointer transition duration-300"
                    >
                      حذف
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">سبد خرید شما خالی است.</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-700">مجموع:</p>
              <p className="text-lg font-semibold text-green-600">
                {totalPrice} AFN
              </p>
            </div>
            <Link
              to="/payment"
              className="block w-full bg-green-600 text-white px-6 py-2 rounded-lg text-center hover:bg-green-700 transition duration-300 mt-4"
            >
              پرداخت
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;
