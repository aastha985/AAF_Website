const mongoose = require("mongoose"); passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	username:String,
	name:String,
	password:String,
	resetPasswordToken:String,
	resetPasswordExpires:Date
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);