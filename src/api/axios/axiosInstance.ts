import axios from 'axios';
import { ROUTE_PATHS } from '../../routes/routePaths';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3004/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = ROUTE_PATHS.LOGIN;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
