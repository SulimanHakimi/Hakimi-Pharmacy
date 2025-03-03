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
      setError("Login failed. Please check your credentials.");
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
    <div className="w-full flex justify-center items-center" >
      <div className="flex px-5 flex-col items-center justify-center h-screen text-center lg:w-1/2 md:w-2/3">
        <h1 className="text-2xl">Login</h1>

        {error && (
          <p severity="error" sx={{ width: "100%", marginBottom: "16px" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <input
            label="Email"
            name="email"
            className="w-full my-5 border-1 p-5"
            value={emailPass.email}
            onChange={handleChange}
            required
          />
          <input
            label="Password"
            type="password"
            name="password"
            className="w-full mb-5 border-1 p-5"
            value={emailPass.password}
            onChange={handleChange}
            required
          />
          <button
            className="bg-green-400 w-full cursor-pointer p-5"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
