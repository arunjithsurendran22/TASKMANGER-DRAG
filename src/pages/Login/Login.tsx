import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { login } from "../../services/authService";

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    const [countryCode, mobileNumber] = phoneNumber.split(" ").filter(Boolean);

    try {
      const user = await login(countryCode, mobileNumber, name, email);

      if (user) {
        localStorage.setItem("accessToken", user.tokens.access.token);
        localStorage.setItem("refreshToken", user.tokens.refresh.token);
        navigate(ROUTE_PATHS.DASHBOARD);
      } else {
        // Switch to signup mode if login fails
        setIsSignup(true);
      }
    } catch (error: any) {
      console.error("Error during authentication:", error);
      alert("Authentication failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg shadow-gray-900">
        <h1 className="text-3xl font-semibold text-white mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h1>
        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">
              Country Code & Mobile Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 234567890"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {isSignup && (
            <>
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="w-full mt-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            {isSignup ? "Back to Login" : "Need an account? Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
