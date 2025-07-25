import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Box, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/footer";
import { setUser } from "../redux/userActions";
import { postRequest } from "../requestMethods";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/account");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await postRequest("auth/login", { emailPass: form });
      if (response.token && response.user) {
        localStorage.setItem("token", response.token);
        dispatch(setUser({ user: response.user, token: response.token }));
        navigate("/account");
      } else {
        setError("ورود ناموفق بود. لطفا اطلاعات خود را بررسی کنید.");
      }
    } catch (err) {
      setError("ورود ناموفق بود. لطفا اطلاعات خود را بررسی کنید.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <Typography variant="h3" sx={{ marginBottom: 3 }}>
            به دواخانه حکیمی خوش آمدید
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            لطفاً وارد شوید تا ادامه دهید
          </Typography>

          <form onSubmit={handleManualLogin} style={{ width: "100%", marginBottom: 16 }}>
            <TextField
              label="ایمیل"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              dir="ltr"
            />
            <TextField
              label="رمز عبور"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              dir="ltr"
            />
            {error && (
              <Typography color="error" sx={{ mt: 1, mb: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: "50px", fontWeight: "bold", backgroundColor: "#00a63e", mt: 2 }}
              disabled={loading}
            >
              {loading ? "در حال ورود..." : "ورود"}
            </Button>
          </form>

          <Button
            variant="contained"
            sx={{
              width: "100%",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              backgroundColor: "#4285F4",
              mb: 2,
            }}
            onClick={handleGoogleLogin}
          >
            ورود با گوگل
          </Button>

          <Typography variant="body2" sx={{ mt: 2 }}>
            حساب کاربری ندارید؟ <Link to="/register">ثبت نام</Link>
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Login;
