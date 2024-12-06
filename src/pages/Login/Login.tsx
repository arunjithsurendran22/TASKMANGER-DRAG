import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { login } from "../../services/authService";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(email, password);

      if (response && response.data) {
        localStorage.setItem("accessToken", response.data.token);
        navigate(ROUTE_PATHS.DASHBOARD);
      }
    } catch (error: any) {
      console.error("Error during authentication:", error);
      alert("Authentication failed.");
    }
  };

  const navigateToRegister = () => {
    navigate(ROUTE_PATHS.REGISTER);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <Card
        elevation={4}
        sx={{
          width: "100%",
          padding: 4,
          borderRadius: 3,
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Welcome Back
          </Typography>
          <form onSubmit={handleAuth}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                required
                sx={{ backgroundColor: "#f1f3f5", borderRadius: 1 }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
                sx={{ backgroundColor: "#f1f3f5", borderRadius: 1 }}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                paddingY: 1.5,
                borderRadius: 3,
                fontSize: "1rem",
                backgroundColor: "#3f51b5",
                color: "#fff",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#303f9f",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Login
            </Button>
          </form>

          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={{ color: "text.secondary" }}>
              Don't have an account?
            </Typography>
            <Button
              variant="text"
              color="secondary"
              onClick={navigateToRegister}
              sx={{
                fontSize: "0.9rem",
                marginLeft: 1,
                textTransform: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Register
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
