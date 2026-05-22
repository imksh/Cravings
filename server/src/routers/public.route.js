import express from "express";
import {
  GetAllRestaurants,
  GetRetaurantMenuData,
  newContact,
  getNearbyRestaurants,
  GetMenuItem,
  getRestaurant,
  getRestaurantMenu,
  getMenuItems,
} from "../controllers/public.controller.js";

const router = express.Router();

router.post("/new-contact", newContact);

router.get("/allRestaurants", GetAllRestaurants);
router.get("/restaurant-menu/:id", GetRetaurantMenuData);
router.get("/menu", getMenuItems);
router.get("/menu/:id", GetMenuItem);
router.get("/restaurant/nearby", getNearbyRestaurants);
router.get("/restaurant/:id", getRestaurant);
router.get("/restaurant/:id/menu", getRestaurantMenu);

export default router;
