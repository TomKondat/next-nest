const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("./../utils/AppError");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users
    },
  });
});

exports.getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError(400, "Please provide the user ID"));
  }
  const user = await User.findById(id);
  if (!user) return next(new AppError(404, "User not found"));
  res.status(200).json({
    status: "success",
    data: {
      user
    },
  });
});

