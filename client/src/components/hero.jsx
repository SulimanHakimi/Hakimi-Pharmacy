import React from 'react';

function Hero() {
  return (
    <section className="hero bg-gradient-to-r from-green-400 to-white py-16 md:py-26 text-center text-white animate__animated animate__fadeIn animate__delay-2s">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
          دواخانه مورد اعتماد شما، تحویل داده شده
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8">
          هم اکنون داروها، محصولات سلامتی و مکمل‌ها را با تحویل سریع خرید کنید.
        </p>
        <a href="/shop" className="bg-green-600 px-6 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-green-700 transition duration-300 animate__animated animate__bounceIn">
          خرید اکنون
        </a>
      </div>
    </section>
  );
}

export default Hero;