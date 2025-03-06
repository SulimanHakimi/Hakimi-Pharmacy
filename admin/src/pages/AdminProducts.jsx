import React, { useState, useEffect } from "react";
import { deleteRequest, getRequest, putRequest } from "../RequestMethods";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null); // Track which product is being edited
  const [editFormData, setEditFormData] = useState({
    title: "",
    price: "",
    stockQuantity: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getRequest("products");
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRequest(`products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (product) => {
    setEditProductId(product._id); // Set the product ID being edited
    setEditFormData({
      title: product.title,
      price: product.price,
      stockQuantity: product.stockQuantity,
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await putRequest(`products/${editProductId}`, editFormData); // Update the product
      const updatedProducts = products.map((product) =>
        product._id === editProductId ? { ...product, ...editFormData } : product
      );
      setProducts(updatedProducts); // Update the state
      setEditProductId(null); // Reset edit mode
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">مدیریت محصولات</h1>

      <div className="hidden lg:block bg-white p-6 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-right">ایدی</th>
              <th className="p-3 text-right">نام</th>
              <th className="p-3 text-right">قیمت</th>
              <th className="p-3 text-right">موجودی</th>
              <th className="p-3 text-right">اقدامات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <React.Fragment key={product._id}>
                {editProductId === product._id ? (
                  <tr className="border-b">
                    <td className="p-3">{product._id}</td>
                    <td className="p-3">
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleEditFormChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        name="price"
                        value={editFormData.price}
                        onChange={handleEditFormChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        name="stockQuantity"
                        value={editFormData.stockQuantity}
                        onChange={handleEditFormChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                      />
                    </td>
                    <td className="p-3">
                      <button
                        onClick={handleEditFormSubmit}
                        className="text-green-600 hover:text-green-800 mr-2"
                      >
                        ذخیره
                      </button>
                      <button
                        onClick={() => setEditProductId(null)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        لغو
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr className="border-b">
                    <td className="p-3">{product._id}</td>
                    <td className="p-3">{product.title}</td>
                    <td className="p-3">{product.price} AFN</td>
                    <td className="p-3">{product.stockQuantity}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        ویرایش
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for smaller screens */}
      <div className="lg:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            {editProductId === product._id ? (
              <form onSubmit={handleEditFormSubmit} className="space-y-2">
                <div>
                  <label className="block font-semibold">نام:</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditFormChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold">قیمت:</label>
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditFormChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold">موجودی:</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={editFormData.stockQuantity}
                    onChange={handleEditFormChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="text-green-600 hover:text-green-800"
                  >
                    ذخیره
                  </button>
                  <button
                    onClick={() => setEditProductId(null)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    لغو
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">ایدی:</span> {product._id}
                </p>
                <p>
                  <span className="font-semibold">نام:</span> {product.title}
                </p>
                <p>
                  <span className="font-semibold">قیمت:</span> {product.price} AFN
                </p>
                <p>
                  <span className="font-semibold">موجودی:</span>{" "}
                  {product.stockQuantity}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    حذف
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;