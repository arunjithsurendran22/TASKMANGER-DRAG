import axiosInstance from "../axios/axiosInstance";
import { AxiosResponse } from "axios";

export interface LoginRequest {
  email?: string;
  password?: string;
}

export const loginApi = (
  email?: string,
  password?: string
): Promise<AxiosResponse<{ data: any }>> =>
  axiosInstance.post<{ data: any }>("/v1/auth/login", {
    email,
    password,
  });

export const registerApi = (
  email?: string,
  name?: string,
  password?: string
): Promise<AxiosResponse<{ data: any }>> =>
  axiosInstance.post<{ data: any }>("/v1/auth/register", {
    email,
    name,
    password,
  });
