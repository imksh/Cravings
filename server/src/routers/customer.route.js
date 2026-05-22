import express from "express";
import protectedRoutes from "../middlewares/auth.middleware.js";
import multer from "multer";
import { customerProtect } from "../middlewares/roleProtect.middleware.js";
import {
  createOrder,
  getCustomerOrders,
  getOrder,
  addAddress,
  setDefaultAddress,
  getActiveOrders,
} from "../controllers/customer.controller.js";

const router = express.Router();
const uploads = multer();

router.post("/order", protectedRoutes, customerProtect, createOrder);
router.post("/address", protectedRoutes, customerProtect, addAddress);
router.get("/order", protectedRoutes, customerProtect, getCustomerOrders);
router.get("/order/active", protectedRoutes, customerProtect, getActiveOrders);
router.get("/order/:id", protectedRoutes, customerProtect, getOrder);
router.patch(
  "/address/:id/default",
  protectedRoutes,
  customerProtect,
  setDefaultAddress,
);

export default router;
