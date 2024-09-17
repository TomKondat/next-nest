const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "The user must have a username"],
      maxlength: [50, "Username cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "The user must have an email"],
      unique: true,
      validate: {
        validator: function (email) {
          return validator.isEmail(email);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      minLength: [8, "Password must be 8 characters or above"],
      select: false,
      required: [true, "The user must have a password"],
    },
    confirmPassword: {
      type: String,
      minLength: [8, "Password must be 8 characters or above"],
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: "Passwords do not match",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["agent", "buyer"],
        message: "Role is either: agent or buyer",
      },
      default: "buyer",
    },
    phone: {
      type: String,
    },
    managedProperties: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Property",
      },
    ],
    savedProperties: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Property",
      },
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    return next(new AppError(400, "Email already exists. Please use another one."));
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = undefined;
  }
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }
  next();
});

userSchema.methods.checkPassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 5 * 60 * 1000;
  return resetToken;
};

userSchema.virtual("properties", {
  ref: "Property",
  localField: "_id",
  foreignField: "user",
});

const User = mongoose.model("User", userSchema);
module.exports = User;
