// utils/axiosConfig.js
import axios from "axios";

const HTTP_REQUEST = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

HTTP_REQUEST.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

HTTP_REQUEST.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default HTTP_REQUEST;
