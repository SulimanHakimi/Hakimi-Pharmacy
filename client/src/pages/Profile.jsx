import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../requestMethods";
import { logoutUser } from "../redux/userActions";
import Footer from "../components/footer";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.user);
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctorRecommendations, setDoctorRecommendations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!user && !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const ordersData = await getRequest(`orders/${user._id}`);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    if (user) {
      fetchUserOrders();
    }
  }, [user]);
  const fetchDoctorRecommendations = async () => {
    try {
      const recommendations = await getRequest(`recommendations/${user._id}`);
      setDoctorRecommendations(recommendations);
    } catch (error) {
      console.error("Error fetching doctor recommendations:", error);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const prescriptions = await getRequest(`prescription/${user._id}`);
      setPrescriptions(prescriptions);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };
  const handlePrescriptionUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) {
      alert("لطفا یک فایل انتخاب کنید!");
      return;
    }

    const MAX_FILE_SIZE = 3 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      alert("حجم فایل باید کمتر از ۳ ام بی باشد!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      postRequest(`prescription/upload`, {
        file: base64,
        userId: user._id,
      }).then(() => {
        fetchDoctorRecommendations();
        fetchPrescriptions();
      });
      setTimeout(() => {
        setUploadSuccess(true);
        e.target.value = "";
      }, 2000);
      setTimeout(() => {
        setUploadSuccess(false);
        e.target.value = "";
      }, 4000);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      alert("خطا در خواندن فایل!");
    };

    reader.readAsDataURL(file);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8 text-gray-800">
            پروفایل{" "}
          </h2>

          {user && (
            <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg mb-8 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  اطلاعات کاربر
                </h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>{" "}
              <button
                onClick={handleLogout}
                className="h-fit bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                خروج
              </button>
            </div>
          )}

          <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              آپلود نسخه
            </h3>
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
                accept="image/*"
                onChange={handlePrescriptionUpload}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 transition duration-300"
              />
            </form>

            {uploadSuccess && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <p className="text-sm">فایل با موفقیت آپلود شد!</p>
              </div>
            )}
          </div>

          <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              نسخه‌های آپلود شده
            </h3>
            {prescriptions.length > 0 ? (
              <ul className="space-y-4">
                {prescriptions.map((prescription) => (
                  <li
                    key={prescription._id}
                    className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm text-gray-500">
                        تاریخ آپلود: {prescription.createdAt}
                      </p>
                    </div>
                    <span className="text-sm text-gray-700">
                      {prescription.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">هنوز نسخه‌ای آپلود نشده است.</p>
            )}
          </div>

          <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              توصیه‌های داکتر
            </h3>
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
                    key={recommendation._id}
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

          <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              سفارشات شما
            </h3>
            {orders.length > 0 ? (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li
                    key={order._id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-lg font-semibold text-gray-700">
                        سفارش #{order._id}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm text-gray-600">
                        تاریخ: {order.createdAt}
                      </p>
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
                      {order.items.map((product, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {product.title} - {product.quantity} عدد -{" "}
                          {product.price}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <p className="text-sm text-gray-700">
                        مجموع:{" "}
                        <span className="font-semibold">
                          {order.totalPrice}
                        </span>
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
      <Footer />
    </>
  );
}

export default ProfilePage;
