import React from "react";

function Category() {
  return (
    <section className="categories py-8 md:py-16 bg-white text-center animate__animated animate__fadeIn animate__delay-2s">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-gray-800">
        خرید از دسته ها
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          <div className="category-item p-4 md:p-6 border border-gray-200 rounded-xl hover:shadow-lg transition duration-300 animate__animated animate__fadeIn animate__delay-3s">
            <a href="/shop/medicines">
              <img
                src="https://t4.ftcdn.net/jpg/02/76/80/31/240_F_276803150_yUZGcTLjJErZdmLw0GhDzARQY91S6yrv.jpg"
                alt="Medicines"
                className="mb-4 mx-auto w-full h-32 md:h-40 object-cover rounded-lg animate__animated animate__fadeIn animate__delay-3s"
              />
              <p className="text-lg md:text-xl font-semibold text-gray-700">دواها</p>
            </a>
          </div>

          <div className="category-item p-4 md:p-6 border border-gray-200 rounded-xl hover:shadow-lg transition duration-300 animate__animated animate__fadeIn animate__delay-4s">
            <a href="/shop/supplements">
              <img
                src="https://t4.ftcdn.net/jpg/09/36/23/85/240_F_936238500_6Ib5eFv4qu4B2J81vt1YBgWVlq3Ru2j3.jpg"
                alt="Supplements"
                className="mb-4 mx-auto w-full h-32 md:h-40 object-cover rounded-lg animate__animated animate__fadeIn animate__delay-4s"
              />
              <p className="text-lg md:text-xl font-semibold text-gray-700">مکمل ها</p>
            </a>
          </div>

          <div className="category-item p-4 md:p-6 border border-gray-200 rounded-xl hover:shadow-lg transition duration-300 animate__animated animate__fadeIn animate__delay-5s">
            <a href="/shop/beauty">
              <img
                src="https://t4.ftcdn.net/jpg/08/25/31/63/240_F_825316398_XGqs0z6IXtlAojLWyGtUj9BZY7KgF2H0.jpg"
                alt="Beauty Products"
                className="mb-4 mx-auto w-full h-32 md:h-40 object-cover rounded-lg animate__animated animate__fadeIn animate__delay-5s"
              />
              <p className="text-lg md:text-xl font-semibold text-gray-700">محصولات زیبایی</p>
            </a>
          </div>

          <div className="category-item p-4 md:p-6 border border-gray-200 rounded-xl hover:shadow-lg transition duration-300 animate__animated animate__fadeIn animate__delay-6s">
            <a href="/shop/health">
              <img
                src="https://t3.ftcdn.net/jpg/02/20/79/32/240_F_220793275_eAtr1ZEnTyZarKko7O2EYfXlxe8LtcBN.jpg"
                alt="Health Products"
                className="mb-4 mx-auto w-full h-32 md:h-40 object-cover rounded-lg animate__animated animate__fadeIn animate__delay-6s"
              />
              <p className="text-lg md:text-xl font-semibold text-gray-700">محصولات سلامتی</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Category;