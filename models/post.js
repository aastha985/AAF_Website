const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
	heading:String,
	image: String,
	imageId: String,
	content: String
});

var Post = mongoose.model("Post",postSchema);
module.exports = Post;