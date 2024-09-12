const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");
const AppError = require("./../utils/AppError");
const Property = require("../models/propertyModel");

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

exports.getManagedProperties = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  let agent = await User.findById(userId).populate('managedProperties');
  if (!agent) {
    return next(new AppError(404, "Agent not found"));
  }
  agent.managedProperties = agent.managedProperties.filter(property => property !== null);
  if (agent.managedProperties.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "No managed properties found for this agent"
    });
  }
  // FIX confirmPassword needed when UPDATE user
  // await agent.save(); // Update the user managedProperties array, removeing non-existent property ref

  res.status(200).json({
    status: "success",
    data: {
      managedProperties: agent.managedProperties
    }
  });
});

exports.getSavedProperties = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  let buyer = await User.findById(userId).populate('savedProperties');
  if (!buyer) {
    return next(new AppError(404, "Buyer not found"));
  }
  buyer.savedProperties = buyer.savedProperties.filter(property => property !== null);
  if (buyer.savedProperties.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "No saved properties found for this buyer"
    });
  }
  // FIX confirmPassword needed when UPDATE user
  // await buyer.save(); // Update the user savedProperties array, removeing non-existent property ref

  res.status(200).json({
    status: "success",
    data: {
      savedProperties: buyer.savedProperties
    }
  });
});

exports.addManagedProperty = asyncHandler(async (req, res, next) => {
  const { propertyId } = req.params;
  const userId = req.user._id;

  const property = await Property.findById(propertyId);
  if (!property) {
    return next(new AppError(404, "Property not found"));
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { managedProperties: propertyId } }, // addToSet ensures no duplicates
    { new: true, runValidators: true }
  ).populate('managedProperties');

  if (!updatedUser) {
    return next(new AppError(404, "User not found"));
  }
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser
    }
  });
});

exports.addSavedProperty = asyncHandler(async (req, res, next) => {
  const { propertyId } = req.params;
  const userId = req.user._id;

  const property = await Property.findById(propertyId);
  if (!property) {
    return next(new AppError(404, "Property not found"));
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { savedProperties: propertyId } },
    { new: true, runValidators: true }
  ).populate('savedProperties');
  if (!updatedUser) {
    return next(new AppError(404, "User not found"));
  }
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser
    }
  });
});
