import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/routePaths";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

import { register } from "../../services/authService";

const Register: React.FC = () => {
  const [name, setName] = useState<string>(""); // State for name
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await register(name, email, password); // Include name in register call
      if (response && response.data) {
        localStorage.setItem("accessToken", response.data.token);
        navigate(ROUTE_PATHS.DASHBOARD);
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      alert("Registration failed.");
    }
  };

  const handleNavigateToLogin = () => {
    navigate(ROUTE_PATHS.LOGIN); // Navigate to login
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
            Create an Account
          </Typography>
          <form onSubmit={handleRegister}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Name"
                type="text"
                value={name} // Name input
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                required
                sx={{ backgroundColor: "#f1f3f5", borderRadius: 1 }}
              />
            </Box>
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
              Register
            </Button>
          </form>
          {/* Add "Already have an account?" section */}
          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <Button
                variant="text"
                onClick={handleNavigateToLogin}
                sx={{ color: "#1976d2", textTransform: "none" }}
              >
                Login 
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
