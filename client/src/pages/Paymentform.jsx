import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../requestMethods";

function PaymentPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Kabul",
    location: "",
    postalCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state?.user?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/shop");
    }
  }, [cartItems, navigate]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseInt(item.price) * item.quantity,
    0
  );

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        cart: cartItems.map((item) => ({
          product: item._id,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        orderAddress: {
          name: address.fullName,
          phone: address.phone,
          email: address.email,
          city: address.city,
          street: address.location,
          postalCode: address.postalCode,
        },
        user: user ? user._id : null,
      };
      const response = await postRequest("orders", orderData);

      if (response) {
        navigate(`/success/${response}`);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (err) {
      console.error("Error creating order:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8 text-gray-800">
          پرداخت
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                آدرس تحویل
              </h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    نام کامل
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={address.fullName}
                    onChange={handleAddressChange}
                    placeholder="نام کامل"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    شماره تماس
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    placeholder="شماره تماس"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ایمیل آدرس{" "}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={address.email}
                    onChange={handleAddressChange}
                    placeholder="ایمیل آدرس"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    شهر
                  </label>
                  <select
                    id="city"
                    name="city"
                    defaultValue={"Kabul"}
                    onChange={handleAddressChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
                    required
                  >
                    <option value="Kabul">کابل</option>
                    <option value="Herat" disabled>
                      هرات
                    </option>
                    <option value="Kandahar" disabled>
                      کندهار
                    </option>
                    <option value="Balkh" disabled>
                      بلخ
                    </option>
                    <option value="Nangarhar" disabled>
                      ننگرهار
                    </option>
                    <option value="Kunduz" disabled>
                      کندز
                    </option>
                    <option value="Baghlan" disabled>
                      بغلان
                    </option>
                    <option value="Badakhshan" disabled>
                      بدخشان
                    </option>
                    <option value="Ghazni" disabled>
                      غزنی
                    </option>
                    <option value="Helmand" disabled>
                      هلمند
                    </option>
                    <option value="Farah" disabled>
                      فراه
                    </option>
                    <option value="Nimruz" disabled>
                      نیمروز
                    </option>
                    <option value="Ghor" disabled>
                      غور
                    </option>
                    <option value="Daykundi" disabled>
                      دایکندی
                    </option>
                    <option value="Urozgan" disabled>
                      ارزگان
                    </option>
                    <option value="Zabul" disabled>
                      زابل
                    </option>
                    <option value="Paktia" disabled>
                      پکتیا
                    </option>
                    <option value="Paktika" disabled>
                      پکتیکا
                    </option>
                    <option value="Logar" disabled>
                      لوگر
                    </option>
                    <option value="Wardak" disabled>
                      وردک
                    </option>
                    <option value="Parwan" disabled>
                      پروان
                    </option>
                    <option value="Kapisa" disabled>
                      کاپیسا
                    </option>
                    <option value="Panjshir" disabled>
                      پنجشیر
                    </option>
                    <option value="Samangan" disabled>
                      سمنگان
                    </option>
                    <option value="Bamyan" disabled>
                      بامیان
                    </option>
                    <option value="Sar-e Pol" disabled>
                      سرپل
                    </option>
                    <option value="Takhar" disabled>
                      تخار
                    </option>
                    <option value="Badghis" disabled>
                      بادغیس
                    </option>
                    <option value="Faryab" disabled>
                      فاریاب
                    </option>
                    <option value="Jowzjan" disabled>
                      جوزجان
                    </option>
                    <option value="Khost" disabled>
                      خوست
                    </option>
                    <option value="Nuristan" disabled>
                      نورستان
                    </option>
                    <option value="Kunar" disabled>
                      کنر
                    </option>
                    <option value="Laghman" disabled>
                      لغمان
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    آدرس{" "}
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={address.location}
                    onChange={handleAddressChange}
                    placeholder="آدرس"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    کود پست
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={address.postalCode}
                    onChange={handleAddressChange}
                    placeholder="کود پست"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
                    required
                  />
                </div>
              </form>
            </div>

            <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                روش پرداخت
              </h3>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`px-4 py-2 rounded-lg transition duration-300 ${
                    paymentMethod === "cash"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  پرداخت در محل
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`px-4 py-2 rounded-lg transition duration-300 ${
                    paymentMethod === "card"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  پرداخت با کارت
                </button>
                <button
                  onClick={() => setPaymentMethod("crypto")}
                  className={`px-4 py-2 rounded-lg transition duration-300 ${
                    paymentMethod === "crypto"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  پرداخت رمز ارز
                </button>
                <button
                  onClick={() => setPaymentMethod("hesap")}
                  className={`px-4 py-2 rounded-lg transition duration-300 ${
                    paymentMethod === "hesap"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  حساب پی (QR)
                </button>
              </div>

              {paymentMethod === "crypto" && (
                <div className="space-y-4">
                  <p className="text-gray-700">برای پرداخت با رمز ارز، مبلغ را به آدرس زیر ارسال کنید:</p>
                  <div className="flex items-center bg-white border rounded-lg p-2">
                    <span className="font-mono text-green-700 select-all text-sm">0x1234abcd5678efgh9012ijklmnopqrstuvwx</span>
                    <button
                      className="ml-2 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText('0x1234abcd5678efgh9012ijklmnopqrstuvwx');
                      }}
                    >
                      کپی
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">پس از پرداخت، رسید را به پشتیبانی ارسال کنید.</p>
                </div>
              )}

              {paymentMethod === "hesap" && (
                <div className="space-y-4">
                  <p className="text-gray-700">برای پرداخت با حساب پی، کد QR زیر را اسکن کنید:</p>
                  <div className="flex justify-center">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=hesappay:pay-to-merchant-123456"
                      alt="Hesap Pay QR"
                      className="rounded border"
                    />
                  </div>
                  <p className="text-xs text-gray-500">پس از پرداخت، رسید را به پشتیبانی ارسال کنید.</p>
                </div>
              )}

              {paymentMethod === "card" && (
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      شماره کارت
                    </label>
                    <input
                      type="text"
                      id="card-number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="card-holder"
                      className="block text-sm font-medium text-gray-700"
                    >
                      نام صاحب کارت
                    </label>
                    <input
                      type="text"
                      id="card-holder"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="نام صاحب کارت"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiry-date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        تاریخ انقضا
                      </label>
                      <input
                        type="text"
                        id="expiry-date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      disabled
                      type="submit"
                      className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 opacity-50 cursor-not-allowed"
                    >
                      این روش پرداخت فعال نیست
                    </button>
                  </div>
                </form>
              )}

              {paymentMethod === "cash" && (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    شما می‌توانید هزینه سفارش خود را در محل تحویل پرداخت کنید.
                  </p>
                  <button
                    onClick={handlePaymentSubmit}
                    className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "در حال اجرا..." : "ثبت سفارش"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              خلاصه سفارش
            </h3>
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
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
            <div className="mt-6 pt-4 border-t border-gray-300">
              <p className="text-lg flex justify-between font-semibold text-gray-700">
                مجموع
                <span className="text-green-600">{totalPrice} AFN</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentPage;
