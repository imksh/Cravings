import Menu from "../models/menu.model.js";
import Restaurant from "../models/restaurant.model.js";
import Order from "../models/order.model.js";
import { generateOrderId } from "../utils/generateOrderId.js";
import { sendSocketToUser } from "../utils/sendSocketToUser.js";
import Customer from "../models/customer.model.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const {
      restaurantId,
      items,
      address,
      paymentMethod,
      paymentStatus,
      subtotal,
      deliveryFee,
      tax,
      total,
    } = req.body;

    const userId = req.user.id;

    if (
      !restaurantId ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Invalid order data",
      });
    }

    if (
      !address ||
      !address.address ||
      !address.city ||
      !address.pin ||
      !address.geoLocation?.coordinates
    ) {
      return res.status(400).json({
        message: "Delivery address is incomplete",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    if (!restaurant.geoLocation?.coordinates) {
      return res.status(400).json({
        message: "Restaurant location unavailable",
      });
    }

    const menu = [];

    let totalPrice = 0;

    for (const item of items) {
      const menuItem = await Menu.findById(item.menuItemId);

      if (!menuItem) {
        return res.status(404).json({
          message: `Menu item ${item.menuItemId} not found`,
        });
      }

      if (!menuItem.isAvailable) {
        return res.status(400).json({
          message: `${menuItem.name} is currently unavailable`,
        });
      }

      menu.push({
        menu: menuItem._id,

        quantity: item.quantity,

        price: menuItem.price,
      });

      totalPrice += menuItem.price * item.quantity;
    }

    const orderId = generateOrderId();

    const calculatedTax = tax || Number((totalPrice * 0.05).toFixed(2));

    const calculatedDeliveryFee = deliveryFee || 0;

    const finalTotal =
      total || totalPrice + calculatedTax + calculatedDeliveryFee;

    const order = await Order.create({
      orderId,

      customer: userId,

      restaurant: restaurantId,

      items: menu,

      deliveryAddress: {
        title: address.title || "Home",

        address: address.address,

        city: address.city,

        pin: address.pin,

        geoLocation: {
          type: "Point",

          coordinates: address.geoLocation.coordinates,
        },
      },

      restaurantLocation: {
        type: "Point",

        coordinates: restaurant.geoLocation.coordinates,
      },

      paymentMethod: paymentMethod || "cod",

      paymentStatus: paymentStatus || "pending",

      status: "pending",

      subtotal: subtotal || totalPrice,

      deliveryFee: calculatedDeliveryFee,

      tax: calculatedTax,

      total: finalTotal,
    });

    const populatedOrder = await Order.findById(order._id)
      .populate("customer", "name email phone")
      .populate("restaurant", "name address logo")
      .populate("items.menu", "name price images");

    sendSocketToUser(restaurant.owner.toString(), "newOrder", populatedOrder);

    res.status(201).json({
      message: "Order created successfully",

      order: populatedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getCustomerOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ customer: userId })
      .populate("restaurant", "name address geoLocation")
      .populate("items.menu", "name price")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments({ customer: userId });

    res.status(200).json({
      message: "Orders retrieved successfully",
      data: orders,
      pagination: {
        total: total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    console.log(orderId);
    

    const order = await Order.findOne({ _id: orderId, customer: userId })
      .populate("restaurant", "name address")
      .populate("items.menu", "name price description images");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getActiveOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const activeStatuses = ["pending", "accepted", "preparing", "ready","picked"];

    const orders = await Order.find({
      customer: userId,
      status: { $in: activeStatuses },
    }).sort({ createdAt: -1 })
      .populate("restaurant", "name address")
      .populate("items.menu", "name price images description");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No active orders found" });
    }

    res.status(200).json({
      message: "Active orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error retrieving active orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      title,
      name,
      address,
      city,
      state,
      landmark,
      instructions,
      pin,
      lat,
      lon,
    } = req.body;

    if (!address || !city || !pin || lat === undefined || lon === undefined) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const customer = await Customer.findOne({
      user: userId,
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const uniqueId = crypto.randomBytes(3).toString("hex").toUpperCase();

    const isFirstAddress = customer.addresses.length === 0;

    customer.addresses.push({
      title: title || "Home",
      id: uniqueId,

      name: name || "",
      isDefault: isFirstAddress,

      address,
      city,
      state: state || "",
      landmark: landmark || "",
      instructions: instructions || "",
      pin,

      geoLocation: {
        type: "Point",

        coordinates: [lon, lat],
      },
    });

    await customer.save();

    res.status(200).json({
      message: "Address added successfully",

      data: customer.addresses,
    });
  } catch (error) {
    console.error("Error adding address:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: addressId } = req.params;

    const customer = await Customer.findOne({
      user: userId,
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const address = customer.addresses.find((addr) => addr.id === addressId);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    customer.addresses.forEach((addr) => {
      addr.isDefault = addr.id === addressId;
    });

    await customer.save();

    res.status(200).json({
      message: "Default address set successfully",
      data: customer.addresses,
    });
  } catch (error) {
    console.error("Error setting default address:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
