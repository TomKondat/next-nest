
const Property = require("../models/propertyModel.js");
const asyncHandler = require("express-async-handler");


exports.getProperties = asyncHandler(async (req, res, next) => {
    const properties = await Property.find()
    console.log(properties);
    res.status(200).json({
        status: 'success',
        properties
    })
})

exports.addProperty = asyncHandler(async (req, res, next) => {
    const newProperty = await Property.create(req.body);
    res.status(201).json({
        status: 'success',
        property: newProperty
    });
});

exports.getPropertyById = asyncHandler(async (req, res, next) => {
    const property = await Property.findById(req.params.id);
    if (!property) {
        return res.status(404).json({
            status: 'fail',
            message: 'Property not found'
        });
    }
    res.status(200).json({
        status: 'success',
        property
    });
});

exports.editPropertyById = asyncHandler(async (req, res, next) => {

    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!property) {
        return res.status(404).json({
            status: 'fail',
            message: 'Property not found'
        });
    }

    res.status(200).json({
        status: 'success',
        property
    });
});

exports.deletePropertyById = asyncHandler(async (req, res, next) => {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
        return res.status(404).json({
            status: 'fail',
            message: 'Property not found'
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Property has been deleted'
    });
});
