import { riderResponseMap } from "../utils/notifyRiders.js";

export const acceptOrder = async (req, res) => {
  const rider = req.user;
  const { orderId } = req.body;

  const request = riderResponseMap.get(orderId);

  if (!request) {
    return res.status(400).json({
      message: "Request expired",
    });
  }

  await request.accept(rider);

  return res.json({
    message: "Order accepted",
  });
};