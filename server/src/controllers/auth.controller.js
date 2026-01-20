import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!email || !phone || !password || !name) {
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

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    });
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

    const token = await generateToken(existingUser, req, res);

    const user = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      phone: existingUser.phone,
      token,
    };
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in Login controller", error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth: ", error);
    next(error);
  }
};
