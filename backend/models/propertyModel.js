const mongoose = require("mongoose");
const axios = require("axios");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "The property must have a title"],
    },
    propertyType: {
      type: String,
      enum: {
        values: [
          "residential",
          "commercial",
          "industrial",
          "land",
          "mixed-Use",
          "retail",
          "hospitality",
        ],
        message:
          "Property type must be one of: residential, commercial, industrial, land, mixed-Use, retail, hospitality",
      },
      required: [true, "The property must have a type"],
    },
    location: {
      houseNumber: {
        type: String,
        required: [true, "The property must have a house number"],
      },
      street: {
        type: String,
        required: [true, "The property must have a street"],
      },
      city: {
        type: String,
        required: [true, "The property must have a city"],
      },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
      zoom: {
        type: Number,
        default: 7,
      },
    },
    price: {
      type: Number,
      required: [true, "The property must have a price"],
    },
    description: {
      type: String,
      required: [true, "The property must have a description"],
    },
    bedrooms: {
      type: Number,
      default: 1,
    },
    bathrooms: {
      type: Number,
      default: 1,
    },
    area: {
      type: Number,
      required: [true, "The property must have an area"],
    },
    images: {
      type: [String],
      default: ["https://via.placeholder.com/300"],
    },
    status: {
      type: String,
      enum: {
        values: ["available", "pending", "sold", "rented"],
        message: "Status must be one of: available, pending, sold, rented",
      },
      default: "available",
    },
    agent: {
      name: {
        type: String,
        required: [true, 'The property must have an agent name']
      },
      contact: {
        phone: {
          type: String,
        },
        email: {
          type: String,
          required: [true, 'The property must have an agent contact email']
        }
      }
    },
    // virtualTour: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

propertySchema.pre("save", async function (next) {
  if (
    !this.location.coordinates ||
    !this.location.coordinates.lat ||
    !this.location.coordinates.lng
  ) {
    try {
      const fetchCoordinates = async (query) => {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: query,
              format: "json",
              limit: 1,
            },
            headers: {
              "User-Agent": "YourAppName",
            },
          }
        );
        return response.data;
      };

      const queries = [
        `${this.location.houseNumber}, ${this.location.street}, ${this.location.city}, Israel`,
        `${this.location.street}, ${this.location.city}, Israel`,
        `${this.location.city}, Israel`,
        `Jerusalem, Israel`,
      ];
      let responseData;
      for (let i = 0; i < queries.length; i++) {
        const data = await fetchCoordinates(queries[i]);
        if (data.length > 0) {
          responseData = data;
          zoomLevel = i === 0 ? 17 : i === 1 ? 16 : i === 2 ? 13 : 7;
          break;
        }
      }
      if (responseData && responseData.length > 0) {
        const { lat, lon } = responseData[0];
        this.location.coordinates = {
          lat: parseFloat(lat).toFixed(5),
          lng: parseFloat(lon).toFixed(5),
        };
        this.location.zoom = zoomLevel;
      } else {
        throw new Error("No coordinates found for the provided address");
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
