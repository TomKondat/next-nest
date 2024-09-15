
const Property = require("../models/propertyModel.js");
const asyncHandler = require("express-async-handler");
const AppError = require("./../utils/AppError");
const APImethods = require('../utils/APImethods.js')

exports.addProperty = asyncHandler(async (req, res, next) => {
    const { title, propertyType, location, price, description, area, agent } = req.body;
    if (!title || !propertyType || !price || !description || !location || !area || !agent) {
        return next(new AppError(400, 'Please provide all the required fields'));
    }
    const newProperty = await Property.create(req.body);
    res.status(201).json({
        status: 'success',
        property: newProperty
    });
});

exports.getProperties = asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.params.propertyId) {
        filter = { _id: req.params.propertyId };
    }
    const apimethods = new APImethods(Property.find(filter), req.query);
    apimethods.filter().sort().selectFields().makePagination();

    const properties = await apimethods.query;
    if (!properties || properties.length === 0) {
        return next(new AppError(404, 'No properties found'));
    }
    const totalProperties = await Property.countDocuments(filter);
    res.status(200).json({
        status: 'success',
        totalProperties,
        properties
    });
});

exports.getPropertyById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new AppError(400, 'No property ID provided'));
    }

    const property = await Property.findById(id);
    if (!property) {
        return next(new AppError(404, "Property not found"));
    }

    res.status(200).json({
        status: 'success',
        property
    });
});

exports.editPropertyById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new AppError(400, 'No property ID provided'));
    }

    const { title, propertyType, price, description, location,
        bedrooms, bathrooms, area, status, images, virtualTour } = req.body;
    if (!title && !propertyType && !price && !description && !location && !bedrooms
        && !bathrooms && !area && !status && !images && !virtualTour) {
        return next(new AppError(400, 'Please provide at least one field to update'));
    }

    const property = await Property.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });
    if (!property) {
        return next(new AppError(404, 'Property not found'));
    }

    res.status(200).json({
        status: 'success',
        property
    });
});

exports.deletePropertyById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new AppError(400, 'No property ID provided'));
    }

    const property = await Property.findByIdAndDelete(id);
    if (!property) {
        return next(new AppError(404, 'Property not found'));
    }

    res.status(200).json({
        status: 'success',
        message: 'Property has been deleted'
    });
});
