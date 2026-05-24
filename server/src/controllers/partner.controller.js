import Menu from "../models/menu.model.js";
import Order from "../models/order.model.js";
import Restaurant from "../models/restaurant.model.js";
import User from "../models/user.model.js";
import { sendSocketToUser } from "../utils/sendSocketToUser.js";
import { UploadMultipleToCloudinary } from "../utils/uploadMultipleToCloudinary.js";
import { UploadSingleToCloudinary } from "../utils/uploadSingleToCloudinary.js";

export const addMenuItem = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      mrp,
      category,
      isVeg,
      isAvailable,
      preparationTime,
    } = req.body;

    const CurrentUser = req.user;

    const images = req.files;

    console.log("Uploaded files:", images);

    if (!name || !description || !price || !category || !preparationTime) {
      const error = new Error("All Fields are Required");
      error.status = 400;
      return next(error);
    }

    let uploads = [];

    if (images) {
      uploads = await UploadMultipleToCloudinary(images, "Cravings/Menu");
    }

    const newMenuItem = await Menu.create({
      name,
      description,
      price,
      category,
      preparationTime,
      mrp: mrp || price,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      isVeg: isVeg !== undefined ? isVeg : false,
      images: uploads,
      restaurant: CurrentUser.restaurant._id,
    });

    res.status(201).json({
      message: "Menu Item Added Successfully",
      data: newMenuItem,
    });
  } catch (error) {
    console.log("Error in addMenu : ", error);
    next(error);
  }
};
export const editMenuItem = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      mrp,
      category,
      isVeg,
      isAvailable,
      preparationTime,
    } = req.body;

    const { id } = req.params;

    const images = req.files;

    const user = req.user;

    if (!name || !description || !price || !category || !preparationTime) {
      const error = new Error("All Fields are Required");
      error.status = 400;
      return next(error);
    }

    let uploads = [];
    if (req.files) {
      uploads = await UploadMultipleToCloudinary(images, "Cravings/Menu");
    }

    const existingMenuItem = await Menu.findById(id);

    existingMenuItem.name = name || existingMenuItem.name;
    existingMenuItem.description = description || existingMenuItem.description;
    existingMenuItem.price = price || existingMenuItem.price;
    existingMenuItem.mrp = mrp || existingMenuItem.mrp;
    existingMenuItem.category = category || existingMenuItem.category;
    existingMenuItem.isVeg =
      isVeg !== undefined ? isVeg : existingMenuItem.isVeg;
    existingMenuItem.isAvailable =
      isAvailable !== undefined ? isAvailable : existingMenuItem.isAvailable;
    existingMenuItem.preparationTime =
      preparationTime || existingMenuItem.preparationTime;

    if (uploads.length > 0) {
      await Promise.all(
        existingMenuItem.images.map(async (img) => {
          if (img?.publicID) {
            await cloudinary.uploader.destroy(img.publicID);
          }
        }),
      );

      existingMenuItem.images = uploads;
    }
    await existingMenuItem.save();

    res.status(201).json({
      message: "Menu Item Updated Successfully",
      data: existingMenuItem,
    });
  } catch (error) {
    next(error);
  }
};

export const getRestaurantMenu = async (req, res, next) => {
  try {
    const user = req.user;
    const menuItems = await Menu.find({ restaurant: user.restaurant._id }).sort(
      { createdAt: -1 },
    );

    res.status(200).json({
      message: "Menu Items Fetched Successfully",
      data: menuItems,
    });
  } catch (error) {
    console.log("Error in getMenu : ", error);
    next(error);
  }
};

export const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const menuItem = await Menu.findByIdAndDelete(id);

    if (!menuItem) {
      const error = new Error("Menu Item not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Menu Item Deleted Successfully",
    });
  } catch (error) {
    console.log("Error in deleteMenu : ", error);

    next(error);
  }
};

export const updateRestaurant = async (req, res, next) => {
  try {
    const { name, description, address, city, pin, cuisine, lat, lon, isOpen } =
      req.body;

    const image = req.files?.image?.[0];

    const coverImage = req.files?.coverImage?.[0];

    const user = req.user;

    const { id } = req.params;

    if (id !== user.restaurant._id.toString()) {
      const error = new Error("Unauthorized");
      error.status = 403;
      return next(error);
    }

    const restaurant = await Restaurant.findById(user.restaurant._id);

    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.status = 404;
      return next(error);
    }

    let coverImageUpload = null;
    let imageUpload = null;

    if (coverImage) {
      coverImageUpload = await UploadSingleToCloudinary(
        coverImage,
        "Cravings/Restaurant",
      );
    }

    if (image) {
      imageUpload = await UploadSingleToCloudinary(
        image,
        "Cravings/Restaurant",
      );
    }

    restaurant.name = name || restaurant.name;
    restaurant.description = description || restaurant.description;
    restaurant.address = address || restaurant.address;
    restaurant.city = city || restaurant.city;
    restaurant.pin = pin || restaurant.pin;
    restaurant.cuisine = cuisine || restaurant.cuisine;
    restaurant.geoLocation =
      lat && lon
        ? { type: "Point", coordinates: [lon, lat] }
        : restaurant.geoLocation;
    restaurant.isOpen = isOpen !== undefined ? isOpen : restaurant.isOpen;

    if (coverImageUpload) {
      if (restaurant.coverImage?.publicId) {
        await cloudinary.uploader.destroy(restaurant.coverImage.publicId);
      }
      restaurant.coverImage = coverImageUpload;
    }

    if (imageUpload) {
      if (restaurant.image?.publicId) {
        await cloudinary.uploader.destroy(restaurant.image.publicId);
      }
      restaurant.image = imageUpload;
    }

    await restaurant.save();

    res.status(200).json({
      message: "Restaurant Details Updated Successfully",
      data: restaurant,
    });
  } catch (error) {
    console.log("Error in editing Restaurant :", error);
    next(error);
  }
};

export const getRestaurantOrders = async (req, res, next) => {
  try {
    const user = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ restaurant: user.restaurant._id })
      .populate("customer", "name email geoLocation")
      .populate("items.menu", "name price")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Orders Fetched Successfully",
      data: orders,
      pagination: {
        total: await Order.countDocuments({ restaurant: user.restaurant._id }),
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.log("Error in getRestaurantOrders : ", error);
    next(error);
  }
};

export const updateRestaurantOrderStatus = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "cancelled", "preparing", "ready"].includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findOne({
      _id: id,
      restaurant: user.restaurant._id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const validTransitions = {
      pending: ["accepted", "rejected", "cancelled", "rejected"],
      accepted: ["preparing", "cancelled", "rejected"],
      preparing: ["ready", "cancelled", "rejected"],
      ready: ["cancelled", "picked", "rejected"],
    };

    if (!validTransitions[order.status].includes(status)) {
      return res.status(400).json({
        message: `Invalid status transition from ${order.status} to ${status}`,
      });
    }

    order.status = status;
    await order.save();

    if (status === "accepted") {
      startRiderSearch(order._id);
    }

    const updatedOrder = await Order.findById(order._id)
      .populate("customer", "name email phone")
      .populate("items.menu", "name price")
      .populate("restaurant", "name address");

    sendSocketToUser(
      order.customer.toString(),
      "orderStatusUpdated",
      updatedOrder,
    );

    res.status(200).json({
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.log("Error in updateRestaurantOrderStatus : ", error);
    next(error);
  }
};

const SEARCH_RADII = [2, 5, 8, 12]; 

export const startRiderSearch = async (orderId) => {
  const order = await Order.findById(orderId).populate("restaurant");

  if (!order) return;

  for (const radius of SEARCH_RADII) {
    const riders = await Rider.find({
      isAvailable: true,

      location: {
        $near: {
          $geometry: {
            type: "Point",

            coordinates: [
              order.restaurant.location.coordinates[0],

              order.restaurant.location.coordinates[1],
            ],
          },

          $maxDistance: radius * 1000,
        },
      },
    });

    const assigned = await notifyRidersSequentially(riders, order);

    if (assigned) {
      return;
    }
  }

  console.log("No rider found");
};


