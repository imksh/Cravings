import socket from "../config/socket";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

export const useSocket = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    socket.auth = {
      userId: user._id,
    };

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [user]);
};
