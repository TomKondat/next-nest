const Property = require("../models/propertyModel.js");
const asyncHandler = require("express-async-handler");
const express = require('express');
const Router = express.Router;
const router = Router();
const AppError = require("./../utils/AppError");
const multer = require("multer");
const sharp = require("sharp");


const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image"))
    cb(new AppError(404, "The file is not type image"), false);
  else cb(null, true);
};
const upload = multer({ memoryStorage, fileFilter });

exports.uploadPropertyImage = upload.single("image");

exports.addProperty = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  req.body.agent={
    "name": "John Doe",
    "contact": {
        "phone": "555-123-4567",
        "email": "johndoe@example.com"
    }
}
  const { title, propertyType, location, price, description, area,agent } = req.body;
  if (!title || !propertyType || !price || !description || !area || !location || !agent) {
      return next(new AppError(400, 'Please provide all the required fields'));
  }
  const newProperty = await Property.create(req.body);
  console.log(newProperty);

  if (req.file) {
      console.log(req.file);

      const fileName = `property-${Date.now()}-${newProperty._id}.jpg`;
      await sharp(req.file.buffer)
          .resize(500, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 80 })
          .toFile(`public/img/properties/${fileName}`);


      newProperty.images = `img/properties/${fileName}`;
      await newProperty.save();
  }
  res.status(201).json({
      status: 'success',
      property: newProperty
  });
});


//actual getProperties---------->>>>>
// exports.getProperties = asyncHandler(async (req, res, next) => {
//     const properties = await Property.find();
//     if (!properties || properties.length === 0) {
//         return next(new AppError(404, 'No properties found'));
//     }

//     res.status(200).json({
//         status: 'success',
//         properties
//     });
// });

// getProperties for debugging---------->>>>>
exports.getProperties = asyncHandler(async (req, res, next) => {
  const properties = await Property.find();
  if (!properties || properties.length === 0) {
    return next(new AppError(404, "No properties found"));
  }

  const reorderedProperties = properties.map((property) => {
    const { _id, ...rest } = property.toObject();
    return { _id, ...rest };
  });

  res.status(200).json({
    status: "success",
    properties: reorderedProperties,
  });
});

exports.getPropertyById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError(400, "No property ID provided"));
  }

  const property = await Property.findById(id);
  if (!property) {
    return next(new AppError(404, "Property not found"));
  }

  res.status(200).json({
    status: "success",
    property,
  });
});

exports.editPropertyById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError(400, "No property ID provided"));
  }

  const {
    title,
    propertyType,
    price,
    description,
    location,
    bedrooms,
    bathrooms,
    area,
    status,
    images,
    virtualTour,
  } = req.body;
  if (
    !title &&
    !propertyType &&
    !price &&
    !description &&
    !location &&
    !bedrooms &&
    !bathrooms &&
    !area &&
    !status &&
    !images &&
    !virtualTour
  ) {
    return next(
      new AppError(400, "Please provide at least one field to update")
    );
  }

  const property = await Property.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!property) {
    return next(new AppError(404, "Property not found"));
  }

  res.status(200).json({
    status: "success",
    property,
  });
});

exports.deletePropertyById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError(400, "No property ID provided"));
  }

  const property = await Property.findByIdAndDelete(id);
  if (!property) {
    return next(new AppError(404, "Property not found"));
  }

  res.status(200).json({
    status: "success",
    message: "Property has been deleted",
  });
});
