const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
	name:String
});

var BlogCategories = mongoose.model("BlogCategories",categorySchema);

module.exports = BlogCategories;