import axiosInstance from "../axios/axiosInstance";
import { AxiosResponse } from 'axios';

export interface LoginRequest {
  countryCode: string;
  mobileNumber: string;
  name?: string;
  email?: string;
}

export interface Tokens {
  token: string;
  expires: string;
}

export interface LoginResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    countryCode: string;
    mobileNumber: string;
  };
  tokens: {
    access: Tokens;
    refresh: Tokens;
  };
}

export const loginApi = (
  countryCode: string,
  mobileNumber: string,
  name?: string,
  email?: string
): Promise<AxiosResponse<{ data: LoginResponse }>> => 
  axiosInstance.post<{ data: LoginResponse }>("/v1/auth/user-login", {
    countryCode,
    mobileNumber,
    name,
    email,
  });
