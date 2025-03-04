import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userActions";

const LoginSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const user = queryParams.get("user");
  const parsedUser = user ? JSON.parse(user) : null;

  useEffect(() => {
    dispatch(setUser({ parsedUser, token }));
    setTimeout(() => {
      navigate("/account");
    }, 2000);
  }, [dispatch, navigate, token, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">ورود موفقیت‌آمیز بود!</h1>
    </div>
  );
};

export default LoginSuccess;
