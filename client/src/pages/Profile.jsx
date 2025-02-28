import React, { useState, useEffect } from "react";

function ProfilePage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctorRecommendations, setDoctorRecommendations] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserInfo = () => {
      const userData = {
        name: "محمد احمدی",
        email: "mohammad.ahmadi@gmail.com",
        profilePicture: "https://via.placeholder.com/150",
      };
      setUser(userData);
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchUserOrders = () => {
      const ordersData = [
        {
          id: 1,
          date: "۱۴۰۲/۰۳/۲۰",
          status: "تحویل شده",
          products: [
            { name: "پارسیتامول", quantity: 2, price: "150 AFN" },
            { name: "ایبوپروفن", quantity: 1, price: "120 AFN" },
          ],
          total: "420 AFN",
        },
        {
          id: 2,
          date: "۱۴۰۲/۰۳/۱۸",
          status: "در حال پردازش",
          products: [
            { name: "ویتامین C", quantity: 1, price: "180 AFN" },
            { name: "آموکسی سیلین", quantity: 3, price: "250 AFN" },
          ],
          total: "930 AFN",
        },
      ];
      setOrders(ordersData);
    };

    fetchUserOrders();
  }, []);

  const handlePrescriptionUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const newPrescription = {
        id: prescriptions.length + 1,
        name: file.name,
        date: new Date().toLocaleDateString("fa-IR"),
        status: "در انتظار بررسی",
      };
      setPrescriptions([...prescriptions, newPrescription]);
      alert("نسخه شما با موفقیت آپلود شد!");
    }
  };

  const fetchDoctorRecommendations = () => {
    const recommendations = [
      {
        id: 1,
        medicine: "پارسیتامول",
        dosage: "هر ۸ ساعت یک عدد",
        doctor: "دکتر احمدی",
      },
      {
        id: 2,
        medicine: "ایبوپروفن",
        dosage: "هر ۱۲ ساعت یک عدد",
        doctor: "دکتر رضایی",
      },
    ];
    setDoctorRecommendations(recommendations);
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8 text-gray-800">
          پروفایل کاربری
        </h2>

        {user && (
          <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">اطلاعات کاربر</h3>
            <div className="flex items-center space-x-4">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="text-lg font-semibold text-gray-700">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">آپلود نسخه</h3>
          <form>
            <label
              htmlFor="prescription-upload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              فایل نسخه خود را انتخاب کنید
            </label>
            <input
              type="file"
              id="prescription-upload"
              accept=".pdf,.jpg,.png"
              onChange={handlePrescriptionUpload}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 transition duration-300"
            />
          </form>
        </div>

        <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">نسخه‌های آپلود شده</h3>
          {prescriptions.length > 0 ? (
            <ul className="space-y-4">
              {prescriptions.map((prescription) => (
                <li
                  key={prescription.id}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      {prescription.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      تاریخ آپلود: {prescription.date}
                    </p>
                  </div>
                  <span className="text-sm text-gray-700">{prescription.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">هنوز نسخه‌ای آپلود نشده است.</p>
          )}
        </div>

        <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">توصیه‌های داکتر</h3>
          <button
            onClick={fetchDoctorRecommendations}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 mb-4"
          >
            دریافت توصیه‌ها
          </button>
          {doctorRecommendations.length > 0 ? (
            <ul className="space-y-4">
              {doctorRecommendations.map((recommendation) => (
                <li
                  key={recommendation.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <p className="text-lg font-semibold text-gray-700">
                    دوا: {recommendation.medicine}
                  </p>
                  <p className="text-sm text-gray-600">
                    دوز مصرف: {recommendation.dosage}
                  </p>
                  <p className="text-sm text-gray-600">
                    داکتر: {recommendation.doctor}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">هنوز توصیه‌ای دریافت نشده است.</p>
          )}
        </div>

        {/* User Orders Section */}
        <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">سفارشات شما</h3>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold text-gray-700">
                      سفارش #{order.id}
                    </p>
                    <p className="text-sm text-gray-600">تاریخ: {order.date}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      وضعیت:{" "}
                      <span
                        className={`font-semibold ${
                          order.status === "تحویل شده"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {order.products.map((product, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {product.name} - {product.quantity} عدد - {product.price}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <p className="text-sm text-gray-700">
                      مجموع: <span className="font-semibold">{order.total}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">هنوز سفارشی ثبت نشده است.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;