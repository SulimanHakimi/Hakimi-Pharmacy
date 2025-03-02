import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userActions";
import { getRequest } from "../requestMethods";

const LoginSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const fetchUserData = async () => {
      try {
        const response = await getRequest("auth/user");
        dispatch(setUser(response, token));
        setTimeout(() => {
          navigate("/account");
        }, 2000);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">ورود موفقیت‌آمیز بود!</h1>
    </div>
  );
};

export default LoginSuccess;
