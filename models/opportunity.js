const mongoose = require("mongoose");

var opportunitySchema = new mongoose.Schema({
	heading:String,
	organisation:String,
	detail:String,
	image: String,
	imageId: String,
	category: Number,
	eligibility:String,
	dates: String,
	process: String,
	prize: String,
	contact: String
});

var Opportunity = mongoose.model("Opportunity",opportunitySchema);
module.exports = Opportunity;