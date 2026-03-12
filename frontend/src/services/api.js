import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= REQUEST INTERCEPTOR =================

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

  },
  (error) => {
    return Promise.reject(error);
  }
);

// ================= RESPONSE INTERCEPTOR =================

api.interceptors.response.use(

  (response) => response,

  (error) => {

    // Backend not reachable
    if (!error.response) {
      console.error("Backend server not responding");
      alert("Server not reachable. Please try again later.");
      return Promise.reject(error);
    }

    const status = error.response.status;

    // Unauthorized → token expired
    if (status === 401) {

      console.warn("Session expired. Logging out...");

      localStorage.clear();

      window.location.href = "/auth";

    }

    // Forbidden
    if (status === 403) {
      console.error("Access denied");
    }

    // Not found
    if (status === 404) {
      console.error("API endpoint not found:", error.config.url);
    }

    // Server error
    if (status >= 500) {
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error);
  }

);

export default api;