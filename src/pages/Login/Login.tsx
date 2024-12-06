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
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { loginAsync } from "../../store/AuthSlice";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await (dispatch as any)(loginAsync({ email, password }));
      if (loginAsync.fulfilled.match(response)) {
        toast.success("Login successful!");
        localStorage.setItem("accessToken", response.payload.token);
        navigate(ROUTE_PATHS.DASHBOARD);
      } else {
        toast.error(response.payload?.message || "Authentication failed");
      }
    } catch (error: any) {
      console.error("Error during authentication:", error);
      toast.error(error.message || "Authentication failed");
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
              disabled={loading} // Disable button while loading
            >
              {loading ? "Logging in..." : "Login"}
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