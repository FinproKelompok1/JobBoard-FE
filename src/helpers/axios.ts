import axios from "axios";
import { getUserData } from "./cookies";

const base_url_be = process.env.NEXT_PUBLIC_BASE_URL_BE;

const api = axios.create({
  baseURL: base_url_be,
});

api.interceptors.request.use(
  (config) => {
    try {
      const userData = getUserData();
      if (userData?.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }
      return config;
    } catch {
      return config;
    }
  },
  (error) => Promise.reject(error),
);

export default api