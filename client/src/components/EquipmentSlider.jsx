import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getRequest } from "../requestMethods";
import { addToCart } from "../redux/cartActions";
import { useDispatch } from "react-redux";

const EquipmentSlider = ({ category, title }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getRequest("products")
      .then((res) => {
        const filteredProducts = res.filter((product) =>
          product.category.includes(category)
        );
        setProducts(filteredProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [category]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
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
        breakpoint: 580,
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
          {title}
        </h2>
        <Slider {...settings}>
          {products.map((item, idx) => (
            <div key={idx} className="px-2">
              <div className="medicine-card sm:w-full bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <img
                  src={item?.images[0]}
                  alt={item?.title}
                  className="mb-4 mx-auto w-full h-48 md:h-56 object-cover rounded-lg"
                />

                <p className="text-center text-lg font-semibold text-gray-700">
                  {item?.title}
                </p>

                {item?.discount && item?.discount > 0 ? (
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-md font-semibold text-gray-500 line-through">
                      {item?.price} AFN
                    </span>
                    <span className="text-md font-semibold text-green-600">
                      {(
                        item?.price -
                        (item?.price * item?.discount) / 100
                      ).toFixed(2)}{" "}
                      AFN
                    </span>
                  </div>
                ) : (
                  <p className="text-md font-semibold text-green-600 mb-4">
                    {item?.price} AFN
                  </p>
                )}

                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300"
                  >
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default EquipmentSlider;
