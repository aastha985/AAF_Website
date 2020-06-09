const express = require("express"),
	  router = express.Router(),
	  Opportunity = require("../models/opportunity"),
	  middleware = require("../middleware");

const OpportunityindexRoutes = require("./opportunitiesindex");
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

//New route
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("opportunities/new");
});

//Create route
router.post("/",middleware.isLoggedIn,upload.single('image'),function(req,res){
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

//=========================================================
router.use(OpportunityindexRoutes);
//========================================================
//show route
router.get("/:id",function(req,res){
	Opportunity.findById(req.params.id,function(err,foundOpportunity){
		if(err){
			console.log(err);
			req.flash("error","Could not display the opportunity");
			res.redirect("/opportunities");
		}
		else{
			res.render("opportunities/show",{opportunity:foundOpportunity});
		}
	});
});

//edit route
router.get("/:id/edit",middleware.isAdmin,function(req,res){
	Opportunity.findById(req.params.id,function(err,foundOpportunity){
		if(err){
			console.log(err);
			req.flash("error","Cannot find the opportunity");
			res.redirect("/opportunities");
		}
		else{
			res.render("opportunities/edit",{opportunity:foundOpportunity});
		}
	});
});

//update
router.put("/:id",middleware.isAdmin,function(req,res){	Opportunity.findByIdAndUpdate(req.params.id,req.body.opportunity,function(err,updatedOpportunity){
			if(err){
				console.log(err);
			}
			else{
				req.flash("success","Opportunity updated successfully");
				res.redirect("/opportunities/"+req.params.id);
			}
		});
});

//edit for image
router.get("/:id/imageedit",middleware.isAdmin,function(req,res){
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
router.put("/:id/image",middleware.isAdmin,upload.single('image'),function(req,res){
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
					opportunity.save();
					req.flash("success","Image Replaced!");
					return res.redirect("/opportunities/"+req.params.id);
					});
				}
		}
	});
});

//delete
router.delete("/:id",middleware.isAdmin,function(req,res){
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
					req.flash("success","Opportunity deleted successfully!");
					return res.redirect("/opportunities");
				}
			});
		}
	});
});


module.exports = router;
	  