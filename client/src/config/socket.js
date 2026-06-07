import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:4500", {
  withCredentials: true,
  autoConnect: false,
});

export default socket;
