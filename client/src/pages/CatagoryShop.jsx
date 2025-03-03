import { useEffect, useState } from "react";
import { getRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartActions";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { cat } = useParams();
  useEffect(() => {
    getRequest("products").then((res) => {
      const filteredData = res.filter((product) =>
        product.category.some((category) => category.toLowerCase() === cat)
      );
      setProducts(filteredData);
      setLoading(false);
    });
  }, [cat]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-lg"
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={192}
                    className="mb-4 rounded-lg"
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={24}
                    className="mb-2"
                  />
                  <Skeleton
                    variant="text"
                    width="40%"
                    height={24}
                    className="mb-4"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={40}
                    className="rounded-lg"
                  />
                </div>
              ))
            : products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="mb-4 w-full h-48 object-cover rounded-lg"
                  />

                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {product.title}
                  </h3>

                  {product.discount && product.discount > 0 ? (
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-md font-semibold text-gray-500 line-through">
                        {product.price} AFN
                      </span>
                      <span className="text-md font-semibold text-green-600">
                        {(
                          product.price -
                          (product.price * product.discount) / 100
                        ).toFixed(2)}{" "}
                        AFN
                      </span>
                    </div>
                  ) : (
                    <p className="text-md font-semibold text-green-600 mb-4">
                      {product.price} AFN
                    </p>
                  )}

                  {product.inStock ? (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                      خرید{" "}
                    </button>
                  ) : (
                    <button
                      className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                      disabled
                    >
                      تمام شده
                    </button>
                  )}
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryPage;
