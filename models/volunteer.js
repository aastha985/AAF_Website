const mongoose = require("mongoose");

var volunteerSchema = new mongoose.Schema({
	name:{
        type:String,
        required:true
    },
    phoneNumber: {
        type:Number,
        required:true
    },
    emailAddress:{
        type: String,
        required:true
    },
    aimToJoin:{
        type: String,
        required:true
    },
    positionDetails:{
        type:String,
        required:true
    },
    approved:{
        type: Boolean,
        required:false,
        default:false,
    }

});

var Volunteer = mongoose.model("Volunteer",volunteerSchema);

module.exports = Volunteer;