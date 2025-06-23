import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api";

axios.interceptors.request.use(
  (config) => {
    if (!config.url.includes("/auth/login") && !config.url.includes("/auth/refresh-token")) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
