import express from "express";

import {
  signup,
  login,
  logout,
  checkAuth,
} from "../controllers/auth.controller.js";
import protectedRoute from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/logout", protectedRoute, logout);
router.get("/check", protectedRoute, checkAuth);

export default router;
