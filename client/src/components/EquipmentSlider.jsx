import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const equipment = [
  { 
    id: 1, 
    name: "ترمومتر دیجیتال", 
    price: "550 AFN", 
    image: "https://image.torob.com/base/images/se/47/se47L_IV3klxxFCY.jpeg_/280x280.webp",
    link: "/product/equipment/1" 
  },
  { 
    id: 2, 
    name: "فشار سنج خون", 
    price: "1200 AFN", 
    image: "https://image.torob.com/base/images/vX/Pl/vXPld8Owm-U2IJv2.jpg_/280x280.webp",
    link: "/product/equipment/2"
  },
  { 
    id: 3, 
    name: "رولر ماساژور عضلات", 
    price: "950 AFN", 
    image: "https://iranmed.co/uploads/products/2f7f9e.jpg",
    link: "/product/equipment/3"
  },
  { 
    id: 4, 
    name: "زانو بند ورزشی", 
    price: "700 AFN", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLcmjIIsGJi_spikQMq9QGv1DlXMgSkS80hg&s",
    link: "/product/equipment/4"
  },
  { 
    id: 5, 
    name: "پد ضد درد عضلات", 
    price: "800 AFN", 
    image: "https://minoo-shop.ir/attachments/1498604/600x600/06%20copy.jpg",
    link: "/product/equipment/5"
  },
];

const EquipmentSlider = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.name} به سبد خرید شما اضافه شد!`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
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
          دستگاه‌های مراقبت شخصی و تجهیزات ورزشی
        </h2>
        <Slider {...settings}>
          {equipment.map((item) => (
            <div key={item.id} className="px-2">
              <Link to={item.link} className="equipment-card-link">
                <div className="medicine-card bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="mb-4 mx-auto w-full h-48 md:h-56 object-cover rounded-lg"
                  />
                  <p className="text-center text-lg font-semibold text-gray-700">{item.name}</p>
                  <p className="text-center text-md font-semibold text-green-600">{item.price}</p>

                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                    >
                      افزودن به سبد خرید
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default EquipmentSlider;