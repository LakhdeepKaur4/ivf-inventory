const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const test1Schema = new mongoose.Schema(
    {
        attributes: {
            size: {
                type: String,
                // trim: true
            },
            color: {
                type: String
                // trim: true
            }
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Test1", test1Schema);
