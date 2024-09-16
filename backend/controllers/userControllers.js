const asyncHandler = require("express-async-handler");
const AppError = require("./../utils/AppError");
const User = require("./../models/userModel");
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

  let agent = await User.findById(userId);
  if (!agent) {
    return next(new AppError(404, "Agent not found"));
  }
  const agentManagedPropertiesLength = agent.managedProperties.length
  await agent.populate('managedProperties');

  const validProperties = agent.managedProperties.filter(property => property !== null);
  if (validProperties.length !== agentManagedPropertiesLength) {
    await User.findByIdAndUpdate(userId, {
      managedProperties: validProperties.map(property => property._id),
    });
  }
  if (validProperties.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "No managed properties found for this agent",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      managedProperties: validProperties,
    },
  });
});

exports.getSavedProperties = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  let user = await User.findById(userId);
  if (!user) {
    return next(new AppError(404, "user not found"));
  }
  const userManagedPropertiesLength = user.managedProperties.length
  await user.populate('savedProperties');

  const validProperties = user.savedProperties.filter(property => property !== null);
  if (validProperties.length !== userManagedPropertiesLength) {
    await User.findByIdAndUpdate(userId, {
      savedProperties: validProperties.map(property => property._id),
    });
  }
  if (validProperties.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "No saved properties found for this user",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      savedProperties: validProperties,
    },
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

exports.deleteFromManagedProperties = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }
    if (!user.managedProperties.includes(propertyId)) {
      return res.status(404).json({ status: "fail", message: "Property not found in managedProperties" });
    }
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { managedProperties: propertyId },
      }
    );
    res.status(200).json({ status: "success", message: "Property removed from managedProperties" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.deleteFromSavedProperties = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }
    if (!user.savedProperties.includes(propertyId)) {
      return res.status(404).json({ status: "fail", message: "Property not found in savedProperties" });
    }
    await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { savedProperties: propertyId },
      }
    );
    res.status(200).json({ status: "success", message: "Property removed from savedProperties" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};