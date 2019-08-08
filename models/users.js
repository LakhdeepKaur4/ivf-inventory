const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			trim: true,
			lowercase: true,
			index: true,
			unique: true
		},
		contact: {
			type: String,
			unique: true,
			required: true
		},
		userName: {
			type: String,
			maxlength: 128,
			trim: true
		},
		firstName: {
			type: String,
			maxlength: 128,
			required: true,
			trim: true
		},
		lastName: {
			type: String,
			maxlength: 128,
			required: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
			trim: true
		},
		userVerified: {
			type: Boolean,
			default: false
		},
	},
	{
		timestamps: true
	}
);

userSchema.pre("save", async function save(next) {
	try {
		if (!this.isModified("password")) return next();

		const rounds = 10;

		var hash = bcrypt.hashSync(this.password, rounds);
		this.password = hash;
		return next();
	} catch (error) {
		return next(error);
	}
});

// userSchema.statics = {
// 	comparePassword(passw, cb) {
// 		bcrypt.compare(passw, this.password, function (err, isMatch) {
// 			if (err) {
// 				return cb(err);
// 			}
// 			cb(null, isMatch);
// 		});
// 	}
// };

/**
 * @typedef User
 */
module.exports = mongoose.model("User", userSchema);
