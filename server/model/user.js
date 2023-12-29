const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        UserId:{
            type: String, require: true
        },
        Account:{
            type: String, require: true
        },
        Password:{
            type: String, require: true
        },
        Displayname:{
            type:String, require: true
        },
    }
);
const User = mongoose.model("User", userSchema, "User");
module.exports = User;