import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { useAppSelector } from "../../hooks/useAppSelector";
import { registerAsync } from "../../store/AuthSlice";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await (dispatch as any)(registerAsync({ name, email, password }));
      if (registerAsync.fulfilled.match(response)) {
        toast.success("Registration successful!");
        localStorage.setItem("accessToken", response.payload.token);
        navigate(ROUTE_PATHS.DASHBOARD);
      } else {
        toast.error(response.payload?.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      toast.error(error.message || "Registration failed");
    }
  };

  const handleNavigateToLogin = () => {
    navigate(ROUTE_PATHS.LOGIN);
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
                value={name}
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
              disabled={loading}
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
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
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
