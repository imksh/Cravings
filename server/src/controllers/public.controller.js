import Contact from "../models/contact.model.js";
import Menu from "../models/menu.model.js";
import Restaurant from "../models/restaurant.model.js";
import User from "../models/user.model.js";

export const newContact = async (req, res, next) => {
  try {
    const { fullName, phone, message, email } = req.body;
    if (!fullName || !phone || !message || !email) {
      return next({
        status: 400,
        message: "All fields are required",
      });
    }

    const newMessage = await Contact.create({
      fullName,
      phone,
      message,
      email,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in newContact controller", error);
    next(error);
  }
};

export const GetAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await User.find({ role: "manager" }).select(
      "-password",
    );

    res.status(200).json(restaurants);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const GetRetaurantMenuData = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const error = new Error("All feilds required");
      error.statusCode = 400;
      return next(error);
    }

    const restaurantMenuData = await Menu.find({
      resturantID: id,
    }).sort({ updatedAt: -1 });

    console.log(restaurantMenuData);

    res.status(200).json(restaurantMenuData);
  } catch (error) {
    next(error);
  }
};

export const GetMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next({
        status: 400,
        message: "Id is missing",
      });
    }

    const menuItem = await Menu.findById(id);
    res.status(200).json(menuItem);
  } catch (error) {
    console.log("Error in menu item: ", error);
    next(error);
  }
};

export const getNearbyRestaurants = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      const error = new Error("Latitude and Longitude are required");
      error.status = 400;
      return next(error);
    }

    const nearbyRestaurants = await Restaurant.find({
      geoLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lon), parseFloat(lat)],
          },
          $maxDistance: 20000,
        },
      },
    });

    res.status(200).json({
      message: "Nearby Restaurants Fetched Successfully",
      data: nearbyRestaurants,
    });
  } catch (error) {
    console.log("Error in getNearbyRestaurants : ", error);
    next(error);
  }
};

export const getRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("Restaurant ID is required");
      error.status = 400;
      return next(error);
    }

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Restaurant Fetched Successfully",
      data: restaurant,
    });
  } catch (error) {
    console.log("Error in getRestaurant : ", error);
    next(error);
  }
};

export const getRestaurantMenu = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("Restaurant ID is required");
      error.status = 400;
      return next(error);
    }

    const menuItems = await Menu.find({ restaurant: id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Menu Items Fetched Successfully",
      data: menuItems,
    });
  } catch (error) {
    console.log("Error in getRestaurantMenu : ", error);
    next(error);
  }
};

export const getMenuItems = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const menuItems = await Menu.find()
      .sort({ rating: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalItems = await Menu.countDocuments();

    res.status(200).json({
      message: "Menu Items Fetched Successfully",
      data: menuItems,
      pagination: {
        totalItems,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalItems / limit),
      },
    });
  } catch (error) {
    console.log("Error in getMenuItems : ", error);
    next(error);
  }
};
