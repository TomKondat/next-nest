const User = require("./../models/userModel");
const AppError = require("./../utils/AppError");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const asyncHandler = require("express-async-handler");

exports.registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, phone, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword || !username) {
        return next(new AppError(403, "Please fill all the fields"));
    }

    const newUser = await User.create({ username, email, phone, password, confirmPassword });

    res.status(201).json({
        status: "success",
        message: "User registered successfully. Please log in to continue.",
        data: {
            user: {
                username: newUser.username,
                email: newUser.email,
                phone: newUser.phone,
                userId: newUser._id
            }
        }
    });
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user._id);
    const cookieOptions = {
        httpOnly: true,
        sameSite: "None",
        expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        secure: true,
    };
    res.cookie("jwt", token, cookieOptions);
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            username: user.username,
            userId: user._id,
        },
    });
};

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError(403, "Please provide email and password"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.checkPassword(password, user.password))) {
        return next(new AppError(403, "Invalid email or password"));
    }

    sendTokenResponse(user, 200, res);
});

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie("jwt", "loggedout", {
        httpOnly: true,
        sameSite: "None",
        expires: new Date(Date.now() - 1000),
        secure: true,
    });

    res.status(200).json({
        status: "success",
        message: "You have been logged out successfully",
    });
});

exports.protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return next(new AppError(403, "You are not logged in"));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return next(new AppError(404, "User no longer exists"));

    if (user.passwordChangedAt && Date.parse(user.passwordChangedAt) / 1000 > decoded.iat) {
        return next(new AppError(403, "Password changed recently. Please login again."));
    }

    req.user = user;
    next();
});

exports.restrictByRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError(403, "You do not have permission to perform this action"));
        }
        next();
    };
};

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return next(new AppError(404, "User not found"));

    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new AppError(400, "No data provided to update the user"));
    }
    const allowedFields = {
        username: req.body.newUsername,
        email: req.body.newEmail,
        phone: req.body.newphone
    };
    const updatedUser = await User.findByIdAndUpdate(userId, allowedFields, {
        new: true,
        runValidators: true,
    });
    if (!updatedUser) return next(new AppError(404, "User not found"));

    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });
});
