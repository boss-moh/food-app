import { BASE_URL } from "@/constants";
import axiosLib, { AxiosError } from "axios";

// Create a custom axios instance with default configurations
const axios = axiosLib.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other headers here
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    // Handle common errors here
    if (error.response) {
      // Server responded with error status
      console.error("Response error:", error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Request error:", error.request);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    return Promise.reject(error.response?.data);
  }
);

export default axios;
export { axios };
