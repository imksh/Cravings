import Order from "../models/order.model.js";
import Menu from "../models/menu.model.js";
import Restaurant from "../models/restaurant.model.js";
export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).populate({
      path: "items.menu",
      select: "name price",
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
