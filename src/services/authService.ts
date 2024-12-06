import { loginApi, registerApi } from "../api/auth/authApi";

export const login = async (
  email: string,
  password: string
): Promise<any | null> => {
  try {
    const response = await loginApi(email, password);
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const register = async (
  email: string,
  name: string, 
  password: string
): Promise<any | null> => {
  try {
    const response = await registerApi(email, name, password);
    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};
