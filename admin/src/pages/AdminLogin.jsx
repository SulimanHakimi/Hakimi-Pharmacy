import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  TextField,
  Alert,
} from "@mui/material";
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
      console.log(response)
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
    setEmailPass(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
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
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", marginBottom: "16px" }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            fullWidth
            margin="normal"
            value={emailPass.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={emailPass.password}
            onChange={handleChange}
            required
          />
          <Button
            variant="contained"
            sx={{
              width: "100%",
              height: "50px",
              marginTop: "16px",
              backgroundColor: "green",
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
