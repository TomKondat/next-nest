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

  const agent = await User.findById(userId).populate('managedProperties');
  if (!agent) {
    return next(new AppError(404, "Agent not found"));
  }
  res.status(200).json({
    status: "success",
    data: {
      managedProperties: agent.managedProperties
    }
  });
});

exports.getSavedProperties = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const buyer = await User.findById(userId).populate('savedProperties');
  if (!buyer) {
    return next(new AppError(404, "Buyer not found"));
  }
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
