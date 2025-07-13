// utils/axiosConfig.js
import axios from "axios";

const HTTP_REQUEST = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

HTTP_REQUEST.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

HTTP_REQUEST.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default HTTP_REQUEST;
