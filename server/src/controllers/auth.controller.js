import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  try {
    const { fullName, email, phone, password } = req.body;
    if (!email || !phone || !password || !fullName) {
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
      fullName,
      email,
      phone,
      password: hashedPassword,
    });

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

    res.status(200).json({ message: "Login successfully" });
  } catch (error) {
    console.log("Error in signup controller", error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("Error in signup controller", error);
    next(error);
  }
};
