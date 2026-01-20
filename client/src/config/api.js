import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5001/api",
  baseURL: "https://cravings-o6av.onrender.com/api",
  headers: {
    "x-platform": "web",
  },
  withCredentials: true,
});

export default api;
