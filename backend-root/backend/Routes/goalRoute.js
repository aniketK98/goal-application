import express, { Router } from "express";

import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js";
import protect from "../middleware/authMiddleware.js";

//set router
const goalRoute = Router();

//set routes
goalRoute.route("/").get(protect, getGoals).post(protect, createGoal);
goalRoute.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

export default goalRoute;
