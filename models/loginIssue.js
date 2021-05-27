const mongoose = require("mongoose");

var loginIssueSchema = new mongoose.Schema({
	email:String,
	description: String,
    resolved:
		{
			type:Boolean,
			default:false
		}
});

let loginIssue = mongoose.model("loginIssue",loginIssueSchema);
module.exports = loginIssue;