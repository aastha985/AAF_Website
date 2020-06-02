const express = require("express"),
	  router = express.Router(),
	  Opportunity = require("../models/opportunity");
//multer setup=====================================================================
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter});
//cloudinary setup================================================================
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dgthqwps1', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
//=====================================================================================
//Index Route
router.get("/",function(req,res){
	res.render("opportunities/index");
});

//Form for adding a new oppurtunity
router.get("/new",function(req,res){
	res.render("opportunities/new");
});

//create route
router.post("/",upload.single('image'),function(req,res){
	cloudinary.uploader.upload(req.file.path, function(result) {
  		req.body.opportunity.image = result.secure_url;
		Opportunity.create(req.body.opportunity,function(err,newOpportunity){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/opportunities");
			}
		});
	});
});

//index route
router.get("/science",function(req,res){
	Opportunity.find({"category":1},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			res.render("opportunities/science/index",{opportunities:Opportunities});
		}
	});
	
});

router.get("/business",upload.single('image'),function(req,res){
	Opportunity.find({"category":2},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			res.render("opportunities/business/index",{opportunities:Opportunities});
		}
	});
});

module.exports = router;
	  