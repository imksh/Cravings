import express from "express";
import multer from "multer";

import {
  getRestaurantMenu,
  addMenuItem,
  editMenuItem,
  deleteMenuItem,
  updateRestaurant,
  getRestaurantOrders,
  updateRestaurantOrderStatus,
} from "../controllers/partner.controller.js";
import { partnerProtect } from "../middlewares/roleProtect.middleware.js";
import protectedRoutes from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer();

router.post(
  "/addMenu",
  protectedRoutes,
  partnerProtect,
  upload.array("images", 5),
  addMenuItem,
);
router.get("/menu", protectedRoutes, partnerProtect, getRestaurantMenu);

router.put(
  "/updateMenu/:id",
  protectedRoutes,
  partnerProtect,
  upload.array("images", 5),
  editMenuItem,
);

router.delete(
  "/deleteMenu/:id",
  protectedRoutes,
  partnerProtect,
  deleteMenuItem,
);

router.put(
  "/updateRestaurant/:id",
  protectedRoutes,
  partnerProtect,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  updateRestaurant,
);

router.get("/orders", protectedRoutes, partnerProtect, getRestaurantOrders);
router.patch(
  "/orders/:id/status",
  protectedRoutes,
  partnerProtect,
  updateRestaurantOrderStatus,
);

// router.put("/update", protectedRoutes, partnerProtect, restaurantUpdate);
// router.patch(
//   "/changePhoto",
//   protectedRoutes,
//   partnerProtect,
//   upload.single("image"),
//   restaurantChangePhoto,
// );

// router.patch(
//   "/resetPassword",
//   protectedRoutes,
//   managerProtect,
//   restaurantResetPassword,
// );

export default router;
