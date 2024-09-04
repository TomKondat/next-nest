const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// const userRoutes = require("./routes/user.Routes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./utils/errorHandler");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
const corsOptions = {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.static("public"));

// app.use("/api/users", userRoutes);

app.all("*", (req, res, next) => {
    next(new AppError(550, "The route can not be found"));
});

app.use(globalErrorHandler);

module.exports = app;