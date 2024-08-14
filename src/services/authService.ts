import { loginApi, LoginResponse } from "../api/auth/authApi";
import { AxiosError } from 'axios';


export const login = async (
  countryCode: string,
  mobileNumber: string,
  name?: string,
  email?: string
): Promise<LoginResponse | null> => {
  try {
    const response = await loginApi(countryCode, mobileNumber, name, email);
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;

    // Check for specific error message indicating missing required fields
    if (axiosError.response?.status === 500 &&
        axiosError.response?.data?.message.includes('validation failed')) {
      return null; // Return null to indicate missing required fields
    }

    throw new Error(axiosError.response?.data?.message || "Login failed");
  }
};
