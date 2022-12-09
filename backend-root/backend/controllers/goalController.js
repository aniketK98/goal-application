import asyncHandler from "express-async-handler";
import Goal from "../model/goalModel.js";
import User from "../model/userModel.js";

// @desc get goals
// @route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc create goal
// @route POST /api/goals
// @access private
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please send data");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(201).json(goal);
});

// @desc update goal
// @route PUT /api/goals
// @access private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  //get user from middleware
  // const user = await User.findById(req.user.id);

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //make sure the logged in user can update the goal
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc delete goal
// @route DELETE /api/goals
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  //get user from middleware
  // const user = await User.findById(req.user.id);

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //make sure the logged in user can delete the goal
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedGoal);
});

export { getGoals, createGoal, updateGoal, deleteGoal };
