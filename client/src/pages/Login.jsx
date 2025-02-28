import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Google } from "@mui/icons-material";

function Login() {
  const handleLogin = () => {
    window.location.href = `${process.env.API_URL}/auth/google`;
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
            backgroundColor:"#00a63e"
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
