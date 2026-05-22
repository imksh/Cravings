import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/authToken.js";
import Otp from "../models/otp.model.js";
import { sendOtpEmail } from "../utils/emailService.js";
import genOtpToken from "../utils/genOtpToken.js";
import Customer from "../models/customer.model.js";
import Restaurant from "../models/restaurant.model.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (!email || !phone || !password || !name || !role) {
      return next({
        status: 400,
        message: "All fields are required.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User Already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const photoURL = `https://placehold.co/600x400?text=${name.charAt(0).toUpperCase()}`;

    const photo = {
      url: photoURL,
    };

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      role,
      password: hashedPassword,
      photo,
    });

    if (role === "customer") {
      await Customer.create({
        user: newUser._id,
      });
    }

    if (role === "partner") {
      await Restaurant.create({
        owner: newUser._id,

        name: `${name}'s Restaurant`,

        logo: {
          url: photoURL,
          publicId: "",
        },

        geoLocation: {
          type: "Point",
          coordinates: [0, 0],
        },
      });
    }

    res.status(201).json({ message: "Registration Successful", data: newUser });
  } catch (error) {
    console.log("Error in signup controller", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next({
        status: 400,
        message: "All fields are required.",
      });
    }
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, existingUser.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //Token Generation
    await genToken(existingUser, res);

    const role = existingUser.role;

    if (role === "customer") {
      const customer = await Customer.findOne({
        user: existingUser._id,
      }).populate("favorites", "name logo");

      return res.status(200).json({
        message: "Login successfully",
        data: {
          ...existingUser.toObject(),
          customer: customer ? customer.toObject() : null,
        },
      });
    }

    if (role === "partner") {
      const restaurant = await Restaurant.findOne({
        owner: existingUser._id,
      });

      return res.status(200).json({
        message: "Login successfully",
        data: {
          ...existingUser.toObject(),
          restaurant: restaurant ? restaurant.toObject() : null,
        },
      });
    }

    res.status(200).json({ message: "Login successfully", data: existingUser });
  } catch (error) {
    console.log("Error in signup controller", error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("Error in signup controller", error);
    next(error);
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const user = req.user;
    const role = user.role;
    if (role === "customer") {
      const customer = await Customer.findOne({
        user: user._id,
      }).populate("favorites", "name logo");

      return res.status(200).json({
        message: "Login successfully",
        data: {
          ...user.toObject(),
          customer: customer ? customer.toObject() : null,
        },
      });
    }

    if (role === "partner") {
      const restaurant = await Restaurant.findOne({
        owner: user._id,
      });

      return res.status(200).json({
        message: "Login successfully",
        data: {
          ...user.toObject(),
          restaurant: restaurant ? restaurant.toObject() : null,
        },
      });
    }

    res.status(200).json({ message: "User authenticated", data: user });
  } catch (error) {
    console.log("Error in signup controller", error);
    next(error);
  }
};

export const genOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next({
        status: 400,
        message: "Email is required.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingOtp = await Otp.findOne({ email });

    if (existingOtp) {
      await existingOtp.deleteOne();
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOtp = await bcrypt.hash(otp, 10);
    const result = await Otp.create({
      email,
      otp: hashedOtp,
    });

    await sendOtpEmail(email, otp);
    res.status(200).json({ message: "Otp sent successfully" });
  } catch (error) {
    console.log("Error in genOtp: ", error);
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return next({
        status: 400,
        message: "All fields are required.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingOtp = await Otp.findOne({ email });

    if (!existingOtp) {
      return next({
        status: 400,
        message: "OTP match failed",
      });
    }

    const isMatched = await bcrypt.compare(otp, existingOtp.otp);

    if (!isMatched) {
      return next({
        status: 400,
        message: "OTP match failed",
      });
    }

    await genOtpToken(existingUser, res);

    res.status(200).json({ message: "Otp verified successfully" });
  } catch (error) {
    console.log("Error in genOtp: ", error);
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const currentUser = req.user;
    if (!newPassword) {
      return next({
        status: 400,
        message: "All fields are required.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    currentUser.password = hashedPassword;

    await currentUser.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("Error in genOtp: ", error);
    next(error);
  }
};
