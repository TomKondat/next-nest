const User = require("./../models/userModel");
const AppError = require("./../utils/AppError");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const asyncHandler = require("express-async-handler");

exports.registerUser = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const { username, email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword)
        return next(new AppError(403, "Please fill all the fields"));

    const newUser = await User.create({
        username,
        email,
        password,
        confirmPassword,
    });

    res.status(201).json({
        status: "success",
        data: {
            user: newUser
        },
    });
});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
        return next(new AppError(403, "Please provide email and password"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new AppError(404, "User not found"));

    console.log((await user.checkPassword(password, user.password)));
    if (!(await user.checkPassword(password, user.password))) {
        console.log(password, user.password);
        return next(new AppError(403, "Email or password is incorrect"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "None",
        expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        secure: true,
    });
    res.status(200).json({
        status: "success",
        token,
        data: {
            username: user.username,
            userId: user._id,
        }
    });
});

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie("jwt", "loggedout", {
        httpOnly: true,
        sameSite: "None",
        expires: new Date(0),
        secure: true,
    });
    res.status(200).json({
        status: "success",
        message: "You have been logged out successfully",
    });
});

exports.protect = asyncHandler(async (req, res, next) => {
    if (!req.cookies || !req.cookies.jwt)
        return next(new AppError(403, "You are not logged in"));
    const token = req.cookies.jwt;
    console.log(token);

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    if (!decoded || decoded.exp < Date.now() / 1000) {
        return next(new AppError(403, "Please login again"));
    }

    const user = await User.findById(decoded.id);
    if (!user) return next(new AppError(404, "User not found"));

    if (Date.parse(user.passwordChangedAt) / 1000 > decoded.iat) {
        return next(new AppError(403, "Password was changed. Please login again."));
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

    if (!deletedUser) {
        return next(new AppError(404, "User not found"));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});

//  FIX WHEN NEED------------>>>>>>
// exports.updateUser = asyncHandler(async (req, res, next) => {
//   if (!req.body || Object.keys(req.body).length === 0) {
//     return next(new AppError(400, "No data provided to update the user"));
//   }
//   const editedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   }).lean();

//   if (!editedUser) {
//     return next(new AppError(404, "User not found"));
//   }
//   res.status(200).json({
//     status: "success",
//     data: {
//       user: editedUser,
//     },
//   });
// });

