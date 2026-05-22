import express from "express";
import { userUpdate, userChangePhoto } from "../controllers/user.controller.js";
import protectedRoutes from "../middlewares/auth.middleware.js";
import multer from "multer";
import { managerProtect } from "../middlewares/roleProtect.middleware.js";

const router = express.Router();
const uploads = multer();

router.put("/update", protectedRoutes, userUpdate);

router.patch(
  "/change-photo",
  protectedRoutes,
  uploads.single("image"),
  userChangePhoto,
);


export default router;
