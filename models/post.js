const mongoose = require("mongoose");
const blogcategories = require("./blogcategories")
const customEnum=(v)=>{
	blogcategories.findOne({name:v},(err,blogcategory)=>{
		if(err||!blogcategory)
			return false
		return true
	})
}
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
	dateApproved:Date,
	category: {type:String, default:"Other",validate: (v)=>{
		return customEnum(v)
	}},
	
});

var Post = mongoose.model("Post",postSchema);

module.exports = Post;