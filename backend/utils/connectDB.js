const mongoose = require("mongoose");

exports.connectDB = async (conStr) => {
    try {
        const con = await mongoose.connect(conStr, { serverSelectionTimeoutMS: 10000 });
        if (con) {
            console.log("Connected to database");
        }
    } catch (err) {
        console.log(err.message);
    }
};