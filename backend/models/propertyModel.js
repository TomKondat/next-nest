

const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The property must have a title']
    },
    propertyType: {
        type: String,
        enum: {
            values: ['residential', 'commercial', 'industrial', 'land', 'mixed-Use', 'retail', 'hospitality'],
            message: 'Property type must be one of: residential, commercial, industrial, land, mixed-Use, retail, hospitality'
        },
        required: [true, 'The property must have a type'],
    },
    location: {
        address: {
            type: String,
            required: [true, 'The property must have an address']
        },
        city: {
            type: String,
            required: [true, 'The property must have a city']
        },
        coordinates: {
            lat: { type: Number },
            lng: { type: Number }
        }
    },
    price: {
        type: Number,
        required: [true, 'The property must have a price']
    },
    description: {
        type: String,
        required: [true, 'The property must have a description']
    },
    bedrooms: {
        type: Number,
        default: 1
    },
    bathrooms: {
        type: Number,
        default: 1
    },
    area: {
        type: Number,
        required: [true, 'The property must have an area']
    },
    images: {
        type: [String],
        default: ["https://via.placeholder.com/300"]
    },
    status: {
        type: String,
        enum: {
            values: ['available', 'pending', 'sold', 'rented'],
            message: 'Status must be one of: available, pending, sold, rented'
        },
        default: 'available'
    },
    agent: {
        name: {
            type: String,
            required: [true, 'The property must have an agent name']
        },
        contact: {
            phone: {
                type: String,
                required: [true, 'The property must have an agent contact phone']
            },
            email: {
                type: String,
                required: [true, 'The property must have an agent contact email']
            }
        }
    },
    virtualTour: {
        type: String
    }
},
    { timestamps: true });


const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
