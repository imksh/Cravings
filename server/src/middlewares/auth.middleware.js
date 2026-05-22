import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Customer from "../models/customer.model.js";
import Restaurant from "../models/restaurant.model.js";
const protectedRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next({
        status: 401,
        message: "Unauthorized! No token ptovided",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next({
        status: 401,
        message: "Unauthorized! Token expired",
      });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next({
        status: 401,
        message: "Unauthorized user",
      });
    }

    const role = user.role;

    if (role === "customer") {
      const customer = await Customer.findOne({
        user: user._id,
      }).populate("favorites", "name logo");

      user.customer = customer ? customer.toObject() : null;
    }

    if (role === "partner") {
      const restaurant = await Restaurant.findOne({
        owner: user._id,
      });

      user.restaurant = restaurant ? restaurant.toObject() : null;
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Auth middleware: ", error);
    next(error);
  }
};

export default protectedRoutes;
