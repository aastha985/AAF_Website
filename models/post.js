const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
	heading:String,
	image: String,
	imageId: String,
	shortDescription: String,
	content: String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username:String,
		name: String
	},
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	],
	likes:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		}
	],
	isApproved:
		{
			type:Boolean,
			default:false
		},
	dateApproved:Date
	
});

var Post = mongoose.model("Post",postSchema);

module.exports = Post;