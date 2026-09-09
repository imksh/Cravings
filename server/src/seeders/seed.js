import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import Customer from "../models/customer.model.js";
import Rider from "../models/rider.model.js";
import Restaurant from "../models/restaurant.model.js";
import Menu from "../models/menu.model.js";
import Order from "../models/order.model.js";
import connectDB from "../config/db.js";
import "../config/env.js";
/* -------------------------------------------------------------------------- */
/*                              SEED FUNCTION                                 */
/* -------------------------------------------------------------------------- */

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("Removing old data...");

    await User.deleteMany();
    await Customer.deleteMany();
    await Rider.deleteMany();
    await Restaurant.deleteMany();
    await Menu.deleteMany();
    await Order.deleteMany();

    console.log("Old data removed");

    /* ---------------------------------------------------------------------- */
    /*                               PASSWORD                                 */
    /* ---------------------------------------------------------------------- */

    const hashedPassword = await bcrypt.hash("ksh777", 10);

    /* ---------------------------------------------------------------------- */
    /*                                 USERS                                  */
    /* ---------------------------------------------------------------------- */

    const users = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@cravings.com",
        phone: "9999999991",
        password: hashedPassword,
        gender: "male",
        role: "admin",
      },

      {
        name: "Karan Sharma",
        email: "karan03945@gmail.com",
        phone: "9999999992",
        password: hashedPassword,
        gender: "male",
        role: "customer",
      },

      {
        name: "Rahul Manager",
        email: "rahul@example.com",
        phone: "9999999993",
        password: hashedPassword,
        gender: "male",
        role: "partner",
      },

      {
        name: "Amit Rider",
        email: "rider@example.com",
        phone: "9999999994",
        password: hashedPassword,
        role: "rider",
      },
    ]);

    const adminUser = users[0];
    const customerUser = users[1];
    const partnerUser = users[2];
    const riderUser = users[3];

    console.log("Users seeded");

    /* ---------------------------------------------------------------------- */
    /*                              CUSTOMER                                  */
    /* ---------------------------------------------------------------------- */

    const customer = await Customer.create({
      user: customerUser._id,

      addresses: [
        {
          id: "HOME123",
          title: "Home",
          name:"",
          address: "City Center Road",
          city: "Bhopal",
          pin: "462001",

          geoLocation: {
            type: "Point",
            coordinates: [77.4126, 23.2599],
          },
        },
      ],
    });

    console.log("Customer seeded");

    /* ---------------------------------------------------------------------- */
    /*                                RIDER                                   */
    /* ---------------------------------------------------------------------- */

    const rider = await Rider.create({
      user: riderUser._id,

      vehicleType: "bike",

      vehicleNumber: "MP04AB1234",

      documents: {
        dl: "DL123456",
        rc: "RC123456",
        aadhaar: "123412341234",
        pan: "ABCDE1234F",
      },

      currentLocation: {
        type: "Point",
        coordinates: [77.4126, 23.2599],
      },

      isAvailable: true,
    });

    console.log("Rider seeded");

    /* ---------------------------------------------------------------------- */
    /*                             RESTAURANT                                 */
    /* ---------------------------------------------------------------------- */

    const restaurant = await Restaurant.create({
      owner: partnerUser._id,

      name: "Spice Route Kitchen",

      cuisine: ["North Indian", "Chinese", "Biryani"],

      description: "Popular for spicy biryanis and grilled dishes.",

      address: "MP Nagar Zone 1",

      city: "Bhopal",

      pin: "462011",

      geoLocation: {
        type: "Point",
        coordinates: [77.4126, 23.2599],
      },

      documents: {
        gst: "GST123456789",
        fssai: "FSSAI987654321",
      },

      paymentDetails: {
        upiId: "spiceroute@upi",
        accountHolderName: "Rahul Verma",
        accountNumber: "1234567890",
        ifscCode: "SBIN0001234",
      },

      rating: 4.8,
      totalReviews: 120,
      isVerified: true,
    });

    console.log("Restaurant seeded");

    /* ---------------------------------------------------------------------- */
    /*                                MENU                                    */
    /* ---------------------------------------------------------------------- */

    const menuItems = await Menu.insertMany([
      {
        restaurant: restaurant._id,

        name: "Chicken Biryani",

        description: "Spicy dum biryani with tender chicken pieces.",

        category: "Biryani",

        price: 299,

        isVeg: false,

        rating: 4.9,

        totalReviews: 230,

        image: {
          url: "/images/food-7.png",
          publicId: "food-7",
        },
      },

      {
        restaurant: restaurant._id,

        name: "Butter Chicken",

        description: "Creamy tomato gravy with grilled chicken.",

        category: "North Indian",

        price: 349,

        isVeg: false,

        rating: 4.8,

        totalReviews: 180,

        image: {
          url: "/images/food-10.png",
          publicId: "food-10",
        },
      },

      {
        restaurant: restaurant._id,

        name: "Paneer Tikka",

        description: "Smoky paneer cubes served with mint chutney.",

        category: "Starter",

        price: 249,

        isVeg: true,

        rating: 4.7,

        totalReviews: 150,

        image: {
          url: "/images/food-1.png",
          publicId: "food-1",
        },
      },
    ]);

    console.log("Menu seeded");

    /* ---------------------------------------------------------------------- */
    /*                                 ORDER                                  */
    /* ---------------------------------------------------------------------- */

    await Order.create({
      orderId: "ORD-123456",
      customer: customerUser._id,

      restaurant: restaurant._id,

      rider: riderUser._id,

      items: [
        {
          menu: menuItems[0]._id,

          quantity: 2,

          price: 299,
        },

        {
          menu: menuItems[2]._id,

          quantity: 1,

          price: 249,
        },
      ],

      deliveryAddress: {
        address: "City Center Road",
        city: "Bhopal",
        pin: "462001",
      },

      paymentMethod: "upi",

      paymentStatus: "paid",

      orderStatus: "confirmed",

      subtotal: 847,

      deliveryFee: 49,

      taxes: 58,

      totalAmount: 954,
    });

    console.log("Order seeded");

    /* ---------------------------------------------------------------------- */
    /*                                 DONE                                   */
    /* ---------------------------------------------------------------------- */

    console.log("Database seeded successfully");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedDatabase();
