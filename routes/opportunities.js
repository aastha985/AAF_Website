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

//=============================science=============================
//create route
router.post("/",upload.single('image'),function(req,res){
	cloudinary.uploader.upload(req.file.path, function(result) {
  		req.body.opportunity.image = result.secure_url;
		req.body.opportunity.imageId = result.public_id;
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
			res.render("opportunities/Categoriesindex/science",{opportunities:Opportunities});
		}
	});
	
	
});
//============================================================================
//index route
router.get("/business",function(req,res){
	Opportunity.find({"category":2},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/business",{opportunities:Opportunities});
		}
	});
});
//index route
router.get("/legal",function(req,res){
	Opportunity.find({"category":3},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/legal",{opportunities:Opportunities});
		}
	});
});

router.get("/media",function(req,res){
	Opportunity.find({"category":4},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/media",{opportunities:Opportunities});
		}
	});
});
router.get("/humanities",function(req,res){
	Opportunity.find({"category":5},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/humanities",{opportunities:Opportunities});
		}
	});
});
router.get("/commerce",function(req,res){
	Opportunity.find({"category":6},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/commerce",{opportunities:Opportunities});
		}
	});
});
router.get("/school",function(req,res){
	Opportunity.find({"category":7},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/school",{opportunities:Opportunities});
		}
	});
});
router.get("/other",function(req,res){
	Opportunity.find({"category":8},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/other",{opportunities:Opportunities});
		}
	});
});
//show route
router.get("/:id",function(req,res){
	Opportunity.findById(req.params.id,function(err,foundOpportunity){
		if(err){
			console.log(err);
			res.redirect("/opportunities");
		}
		else{
			// res.send("this will be the show page");
			res.render("opportunities/show",{opportunity:foundOpportunity});
		}
	});
});

//edit route
router.get("/:id/edit",function(req,res){
	Opportunity.findById(req.params.id,function(err,foundOpportunity){
		if(err){
			console.log(err);
			res.redirect("/science");
		}
		else{
			res.render("opportunities/edit",{opportunity:foundOpportunity});
		}
	});
});

//update
router.put("/:id",upload.single('image'),function(req,res){	Opportunity.findByIdAndUpdate(req.params.id,req.body.opportunity,function(err,updatedOpportunity){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/opportunities/"+req.params.id);
			}
		});
});

router.get("/:id/imageedit",function(req,res){
	Opportunity.findById(req.params.id,function(err,foundOpportunity){
		if(err){
			console.log(err);
			res.redirect("/opportunities");
		}
		else{
			res.render("opportunities/imageedit",{opportunity:foundOpportunity});
		}
	});
});
//update route for image
router.put("/:id/image",upload.single('image'),function(req,res){
	Opportunity.findById(req.params.id,function(err,opportunity){
		if(err){
			console.log(err);
		}
		else{
			cloudinary.v2.uploader.destroy(opportunity.imageId);
				if(err){
					console.log(err);
				}
				else{
					cloudinary.uploader.upload(req.file.path, function(result) {
					opportunity.image = result.secure_url;
					opportunity.imageId = result.public_id;
					res.redirect("/opportunities/"+req.params.id);
					opportunity.save();
					});
				}
		}
	});
});
//delete
router.delete("/:id",function(req,res){
	Opportunity.findById(req.params.id,function(err,opportunity){
		if(err){
			console.log(err);
		}
		else{		cloudinary.v2.uploader.destroy(opportunity.imageId,function(err,deleteOpportunity){
				if(err){
					console.log(err);
				}
				else{
					opportunity.remove();
					console.log("removed");
					res.redirect("/opportunities");
				}
			});
		}
	});
});


module.exports = router;
	  