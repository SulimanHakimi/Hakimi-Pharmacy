import { useEffect, useState } from "react";
import { getRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartActions";
import Skeleton from "@mui/material/Skeleton";
import Footer from "../components/footer"
function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getRequest("products").then((res) => {
      setProducts(res);
      setLoading(false);
    });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "همه" || product.category.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "همه",
    ...new Set(products.map((product) => product.category[0])),
  ];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8 text-gray-800">
          فروشگاه
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-auto">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              دسته‌بندی
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
            >
              {categories.map((category, idx) => (
                <option key={category + idx} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-auto">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              جستجو
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو محصولات..."
              className="mt-1 block w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-lg">
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
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
            ))
          ) : (
            <div className="flex h-screen w-full justify-center items-center">
              هیچ محصولی یافت نشد.
            </div>
          )}
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}

export default ShopPage;
