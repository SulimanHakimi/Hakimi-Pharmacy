import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest } from "../requestMethods";
import { clearCart } from "../redux/cartActions";
import { useDispatch } from "react-redux";

function SuccessPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());

    const fetchOrderDetails = async () => {
      try {
        const response = await getRequest(`orders/details/${id}`);
        setOrder(response);
      } catch (err) {
        setError(err.message || "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, dispatch]);

  if (loading) {
    return <div className="text-center py-12">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          بازگشت به فروشگاه
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p>No order details found.</p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          بازگشت به فروشگاه
        </button>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8 text-gray-800">
          سفارش شما با موفقیت ثبت شد!
        </h2>

        <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            جزئیات سفارش
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">شماره سفارش:</span> {order._id}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">وضعیت:</span> {order.status}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">آدرس تحویل:</span>{" "}
                {order.shippingAddress?.street}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">نام تحویل گیرنده:</span>{" "}
                {order.shippingAddress.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">تلفن تماس:</span>{" "}
                {order.shippingAddress.phone}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">
              اقلام سفارش
            </h4>
            <ul className="space-y-4">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <p className="text-sm text-gray-700">
                    {item.title} ({item.quantity} عدد)
                  </p>
                  <p className="text-sm text-gray-700">
                    {item.price * item.quantity} AFN
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-300">
            <p className="text-lg flex justify-between font-semibold text-gray-700">
              مجموع
              <span className="text-green-600">{order.totalPrice} AFN</span>
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate("/shop")}
              className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
            >
              بازگشت به فروشگاه
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SuccessPage;
