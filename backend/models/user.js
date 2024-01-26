// import mongoose module
const mongoose = require("mongoose");
// create user schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    tel: Number,
    role: String,
    active:Boolean,
});

// create User Model
const user = mongoose.model("User", userSchema);
// make user exportable
module.exports = user;