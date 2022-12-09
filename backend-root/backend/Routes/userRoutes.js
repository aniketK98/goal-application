import express, { Router } from "express";
import {
  registerUser,
  authenticateUser,
  getMe,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const userRoute = Router();

userRoute.route("/").post(registerUser);
userRoute.route("/login").post(authenticateUser);
userRoute.route("/me").get(protect, getMe);

export default userRoute;
