import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const medicines = [
  {
    id: 1,
    name: "پارسیتامول",
    price: "150 AFN",
    image: "https://t3.ftcdn.net/jpg/06/17/54/18/240_F_617541801_AhxoejzjQrJY8PCifGIxLEoOQjQXnanT.jpg",
    link: "/product/1",
  },
  {
    id: 2,
    name: "ایبوپروفن",
    price: "120 AFN",
    image: "https://res-3.cloudinary.com/dk0z4ums3/image/upload/c_scale,h_500,w_500/v1/production/pharmacy/products/1687335978_ibu_400_fm",
    link: "/product/2",
  },
  {
    id: 3,
    name: "آسپیرین",
    price: "200 AFN",
    image: "https://res.cloudinary.com/dk0z4ums3/image/upload/w_300,h_166,c_fill/v1625831531/attached_image/benarkah-aspirin-dapat-mencegah-efek-samping-vaksin-astrazeneca.jpg",
    link: "/product/3",
  },
  {
    id: 4,
    name: "ویتامین C",
    price: "180 AFN",
    image: "https://t4.ftcdn.net/jpg/08/57/03/87/240_F_857038720_UhMdMxtGdmAptUL9uTw3YwLnkNIYPPze.jpg",
    link: "/product/4",
  },
  {
    id: 5,
    name: "آموکسی سیلین",
    price: "250 AFN",
    image: "https://t4.ftcdn.net/jpg/06/38/41/87/240_F_638418741_cPQYQh9vT4JLiDRtbWQfbQ5jcxU1GzGw.jpg",
    link: "/product/5",
  },
];

const MedicinesSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default number of slides to show
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // For tablets and smaller desktops
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // For smaller tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8">
          داروهای پرطرفدار
        </h2>
        <Slider {...settings}>
          {medicines.map((medicine) => (
            <div key={medicine.id} className="px-2">
              <Link to={medicine.link} className="medicine-card-link">
                <div className="medicine-card bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="mb-4 mx-auto w-full h-48 md:h-56 object-cover rounded-lg"
                  />
                  <p className="text-center text-lg font-semibold text-gray-700">
                    {medicine.name}
                  </p>
                  <p className="text-center text-md font-semibold text-green-600">
                    {medicine.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default MedicinesSlider;