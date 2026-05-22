import express from "express";
import protectedRoutes from "../middlewares/auth.middleware.js";
import resetPasswordMiddleware from "../middlewares/resetPassword.middleware.js";

import {
  signup,
  login,
  logout,
  genOtp,
  verifyOtp,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/logout", protectedRoutes, logout);
router.post("/gen-otp", genOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPasswordMiddleware, resetPassword);
router.get("/check", protectedRoutes, checkAuth);

export default router;
