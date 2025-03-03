import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton"; 

function Category() {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="categories py-8 md:py-16 bg-white text-center animate__animated animate__fadeIn animate__delay-2s">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-gray-800">
        خرید از دسته ها
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {loading
            ? 
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="category-item p-4 md:p-6 border border-gray-200 rounded-xl hover:shadow-lg transition duration-300"
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={160}
                    className="mb-4 rounded-lg"
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={24}
                    className="mx-auto"
                  />
                </div>
              ))
            : 
              [
                {
                  id: 1,
                  name: "دواها",
                  image:
                    "https://t4.ftcdn.net/jpg/02/76/80/31/240_F_276803150_yUZGcTLjJErZdmLw0GhDzARQY91S6yrv.jpg",
                  link: "/shop/medicines",
                },
                {
                  id: 2,
                  name: "مکمل ها",
                  image:
                    "https://t4.ftcdn.net/jpg/09/36/23/85/240_F_936238500_6Ib5eFv4qu4B2J81vt1YBgWVlq3Ru2j3.jpg",
                  link: "/shop/supplements",
                },
                {
                  id: 3,
                  name: "محصولات زیبایی",
                  image:
                    "https://t4.ftcdn.net/jpg/08/25/31/63/240_F_825316398_XGqs0z6IXtlAojLWyGtUj9BZY7KgF2H0.jpg",
                  link: "/shop/beauty",
                },
                {
                  id: 4,
                  name: "محصولات سلامتی",
                  image:
                    "https://t3.ftcdn.net/jpg/02/20/79/32/240_F_220793275_eAtr1ZEnTyZarKko7O2EYfXlxe8LtcBN.jpg",
                  link: "/shop/health",
                },
              ].map((category) => (
                <div
                  key={category.id}
                  className="category-item p-4 md:p-6 border border-gray-200 rounded-xl hover:shadow-lg transition duration-300 animate__animated animate__fadeIn"
                >
                  <a href={category.link}>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="mb-4 mx-auto w-full h-32 md:h-40 object-cover rounded-lg"
                    />
                    <p className="text-lg md:text-xl font-semibold text-gray-700">
                      {category.name}
                    </p>
                  </a>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default Category;