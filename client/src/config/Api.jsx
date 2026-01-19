import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
  // baseURL: "http://10.53.203.71:5001",
});

export default api;
