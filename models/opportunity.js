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
	contact: String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username:String,
		name: String
	},
	isApproved:
		{
			type:Boolean,
			default:false
		}
});

var Opportunity = mongoose.model("Opportunity",opportunitySchema);
module.exports = Opportunity;