import React, { useEffect } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user) {
      navigate("/account");
    }
  }, [user, navigate]);
  const handleLogin = () => {
    window.location.href = `http://localhost:5000/api/auth/google`;
  };
  return (
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
          به فروشگاه دوا خوش آمدید
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          لطفاً با استفاده از حساب گوگل خود وارد شوید تا ادامه دهید
        </Typography>

        <Button
          variant="contained"
          sx={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            fontWeight: "bold",
            backgroundColor: "#00a63e",
          }}
          onClick={handleLogin}
        >
          <Google sx={{ fontSize: "24px" }} />
          ورود با گوگل
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
