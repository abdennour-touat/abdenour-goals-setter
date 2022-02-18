/**
 * the goals controllers to manipulate the goals data...
 * Create
 * Read
 * Update
 * Delete
 */
//Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");
//@desc get goals
//@route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});
//@desc get goals
//@route POST /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});
//@desc get goals
//@route PUT /api/goals/:id
// @access Private
const putGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
  }
  //check for user
  const user = user.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});
//@desc get goals
//@route DELETE /api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
   
  //check for user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const deletedGoal = await goal.remove(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoals, putGoals, deleteGoals };
