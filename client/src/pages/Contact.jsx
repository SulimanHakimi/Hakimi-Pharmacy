import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Footer from "../components/footer";
import { Helmet } from "react-helmet";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_sij9hag",
        "template_v3rjr84",
        formData,
        "Ufc6wG8fADGYUCvLV"
      )
      .then(
        () => {
          setStatus("پیام موفقانه ارسال شد");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("خطا در ارسال پیام");
        }
      );
    setTimeout(() => {
      setStatus("");
    }, 5000);
  };

  return (
    <>
      <Helmet>
        <title>تماس با ما | خدمات پشتیبانی</title>
        <meta
          name="description"
          content="تماس با تیم پشتیبانی برای هرگونه سوال یا درخواست. ارسال پیام به ما از طریق فورم تماس."
        />
        <meta
          name="keywords"
          content="تماس با ما, پشتیبانی, پیام, فورم تماس, خدمات پشتیبانی"
        />
        <meta property="og:title" content="تماس با ما" />
        <meta
          property="og:description"
          content="تماس با تیم پشتیبانی برای هرگونه سوال یا درخواست. ارسال پیام به ما از طریق فورم تماس."
        />
        <meta property="og:url" content={`${import.meta.env.CLIENT_UR}/contact`} />
        <meta property="og:image" content="../$assets/logo.png" />
      </Helmet>
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8 text-gray-800">
            تماس با ما
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                فورم تماس
              </h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    نام شما
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
                    placeholder="نام خود را وارد کنید"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ایمیل شما
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
                    placeholder="ایمیل خود را وارد کنید"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    پیام شما
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition duration-300"
                    placeholder="پیام خود را بنویسید..."
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    ارسال پیام
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  اطلاعات تماس
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      آدرس: کارته نو ایستگاه سابقه کابل افغانستان
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-700">تلفن: 93784966018</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      ایمیل: afgsuliman50@gmail.com
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={` ${
                status === "پیام موفقانه ارسال شد"
                  ? "flex bg-green-100 text-green-800 p-2 rounded-lg   items-center space-x-2"
                  : status === "خطا در ارسال پیام"
                  ? " flex bg-red-100 text-red-800 p-2 rounded-lg   items-center space-x-2 "
                  : "hidden"
              }`}
            >
              {status === "پیام موفقانه ارسال شد" ? (
                <FaCheckCircle className="text-lg" />
              ) : (
                <FaTimesCircle className="text-lg" />
              )}
              <p className="text-sm font-medium">{status}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ContactPage;
