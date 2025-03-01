import { useEffect, useState } from "react";
import { getRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { addToCart, updateCart, removeFromCart } from "../redux/cartActions";
import { useParams } from "react-router-dom";

function CategoryPage() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { cat } = useParams();
  useEffect(() => {
    getRequest("products")
      .then((res) => {
        const filteredData = res.filter((product) =>
          product.category.some((category) => category.toLowerCase() === cat)
        );
        setProducts(filteredData);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [cat]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products ? products.map((product) => (
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
          )) : <div className="flex h-screen w-full justify-center items-center">loading...</div>}
        </div>
      </div>
    </section>
  );
}

export default CategoryPage;
