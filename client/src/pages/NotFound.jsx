import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-white text-center text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4 md:mb-6 animate__animated animate__bounceIn">
          404
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-6 md:mb-8 animate__animated animate__fadeIn animate__delay-1s">
          صفحه مورد نظر یافت نشد!
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 animate__animated animate__fadeIn animate__delay-2s">
          متاسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>
        <Link
          to="/"
          className="bg-green-600 px-6 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-green-700 transition duration-300 animate__animated animate__bounceIn animate__delay-3s"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;