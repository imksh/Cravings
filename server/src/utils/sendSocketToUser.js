import {
  getReceiverSocketIds,
  io,
} from "../config/socket.js";

export const sendSocketToUser = (
  userId,
  socketName,
  data
) => {
  if (!userId) return;

  const socketIds =
    getReceiverSocketIds(userId);

  if (
    !socketIds ||
    socketIds.size === 0
  ) {
    console.log(
      `No active sockets for user ${userId}`
    );

    return;
  }

  socketIds.forEach(
    (socketId) => {
      io.to(socketId).emit(
        socketName,
        data
      );
    }
  );
};