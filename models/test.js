const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const testSchema = new mongoose.Schema(
    {
        size: {
            type: String,
            maxlength: 128,
            // required: true,
            // trim: true
        },
        color: {
            type: String,
            // trim: true
        },
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Test", testSchema);
