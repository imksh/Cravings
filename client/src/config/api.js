import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_PUBLIC_API_URL}/api`,
  headers: {
    "x-platform": "web",
  },
  withCredentials: true,
});

export default api;
