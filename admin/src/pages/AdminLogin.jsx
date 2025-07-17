import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../RequestMethods";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userActions";

function Login() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [emailPass, setEmailPass] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await postRequest("auth/login", { emailPass });
      dispatch(setUser(response.user, response.token));

      if (response.user) {
        navigate("/");
      }
    } catch (err) {
      setError("ورود ناموفق بود. لطفا اطلاعات خود را بررسی کنید.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmailPass((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <img src="/logo.png" alt="Logo" className="w-40 h-40 mb-6 rounded-full shadow-md" />
        <h1 className="text-3xl font-bold text-green-700 mb-8 tracking-tight">ورود مدیر</h1>
        {error && (
          <div className="w-full mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm text-right">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2 text-right">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 pr-1">
              ایمیل
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={emailPass.email}
              onChange={handleChange}
              required
              placeholder="ایمیل خود را وارد کنید"
              dir="ltr"
            />
          </div>
          <div className="flex flex-col gap-2 text-right">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 pr-1">
              رمز عبور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={emailPass.password}
              onChange={handleChange}
              required
              placeholder="رمز عبور خود را وارد کنید"
              dir="ltr"
            />
          </div>
          <button
            className={`w-full py-3 mt-2 rounded-lg font-bold text-white transition 
              ${loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 cursor-pointer"}`}
            type="submit"
            disabled={loading}
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
