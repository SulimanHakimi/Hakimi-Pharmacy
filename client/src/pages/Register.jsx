import React, { useState } from "react";
import { Button, Container, Typography, Box, TextField } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/footer";
import { postRequest } from "../requestMethods";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await postRequest("auth/register", form);
      if (response && response._id) {
        navigate("/login");
      } else {
        setError("ثبت نام ناموفق بود. لطفا اطلاعات خود را بررسی کنید.");
      }
    } catch (err) {
      setError("ثبت نام ناموفق بود. لطفا اطلاعات خود را بررسی کنید.");
    } finally {
      setLoading(false);
    }
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
            ثبت نام
          </Typography>
          <form onSubmit={handleRegister} style={{ width: "100%", marginBottom: 16 }}>
            <TextField
              label="نام"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              dir="rtl"
            />
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
              {loading ? "در حال ثبت نام..." : "ثبت نام"}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            حساب کاربری دارید؟ <Link to="/login">ورود</Link>
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Register; 