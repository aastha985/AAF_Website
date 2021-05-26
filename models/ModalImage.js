const mongoose = require("mongoose");

var ModalImageSchema = new mongoose.Schema({
	Url:String,
	toDisplay:
		{
			type:Boolean,
			default:false
		},
	Search: String
});

let ModalImage = mongoose.model("ModalImage",ModalImageSchema);
module.exports = ModalImage;