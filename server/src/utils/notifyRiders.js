import { sendSocketToUser } from "./sendSocketToUser.js";

export const riderResponseMap = new Map();

const waitForBatchResponse = (orderId, timeout = 15000) => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      riderResponseMap.delete(orderId.toString());
      resolve(null);
    }, timeout);

    riderResponseMap.set(orderId.toString(), {
      accept: async (rider) => {
        clearTimeout(timer);

        riderResponseMap.delete(orderId.toString());

        resolve(rider);
      },
    });
  });
};

export const notifyRiders = async (riders, order) => {
  // nearest riders first
  const batchSize = 3;

  for (let i = 0; i < riders.length; i += batchSize) {
    const batch = riders.slice(i, i + batchSize);

    // notify all riders in parallel
    for (const rider of batch) {
      sendSocketToUser(
        rider._id.toString(),
        "newOrderRequest",
        order,
      );
    }

    const acceptedRider = await waitForBatchResponse(
      order._id,
      15000,
    );

    if (acceptedRider) {
      order.rider = acceptedRider._id;
      order.status = "rider_assigned";

      await order.save();

      acceptedRider.isAvailable = false;
      await acceptedRider.save();

      // notify remaining riders
      for (const rider of batch) {
        if (
          rider._id.toString() !==
          acceptedRider._id.toString()
        ) {
          sendSocketToUser(
            rider._id.toString(),
            "orderUnavailable",
            {
              orderId: order._id,
            },
          );
        }
      }

      return true;
    }
  }

  return false;
};