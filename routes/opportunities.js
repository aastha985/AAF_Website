const express = require("express"), router = express.Router(), Opportunity = require("../models/opportunity"), middleware = require("../middleware");
const OpportunityindexRoutes = require("./opportunitiesindex");

// Multer setup 
const multer = require('multer');
let storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

let imageFilter = (req, file, cb) => {
    // Accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter});

// Cloudinary setup
let cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Index Route
router.get("/", (req,res) =>
	res.render("opportunities/index")
);

// New route
router.get("/new", middleware.isLoggedIn, (req,res) => 
	res.render("opportunities/new")
);

// Create route
router.post("/", middleware.isLoggedIn,upload.single('image'), (req,res) => {
	cloudinary.uploader.upload(req.file.path, function(result) {
  		req.body.opportunity.image = result.secure_url;
		req.body.opportunity.imageId = result.public_id;
		Opportunity.create(req.body.opportunity, (err,newOpportunity) => {
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/opportunities");
			}
		});
	});
});

router.use(OpportunityindexRoutes);

// Show route
router.get("/:id",function(req,res){
	Opportunity.findById(req.params.id, (err,foundOpportunity) => {
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

// Edit route
router.get("/:id/edit",middleware.isAdmin, (req,res) => {
	Opportunity.findById(req.params.id, (err,foundOpportunity) => {
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

// Update
router.put("/:id", middleware.isAdmin, (req,res) => {	
	Opportunity.findByIdAndUpdate(req.params.id,req.body.opportunity, (err,updatedOpportunity) => {
		if(err){
			console.log(err);
		}
		else{
			req.flash("success","Opportunity updated successfully");
			res.redirect("/opportunities/"+req.params.id);
		}
	});
});

// Edit for image
router.get("/:id/imageedit", middleware.isAdmin, (req,res) => {
	Opportunity.findById(req.params.id, (err,foundOpportunity) => {
		if(err){
			console.log(err);
			res.redirect("/opportunities");
		}
		else{
			res.render("opportunities/imageedit",{opportunity:foundOpportunity});
		}
	});
});

// Update route for image
router.put("/:id/image", middleware.isAdmin,upload.single('image'), (req,res) => {
	Opportunity.findById(req.params.id, (err,opportunity) => {
		if(err){
			console.log(err);
		}
		else{
			cloudinary.v2.uploader.destroy(opportunity.imageId);
				if(err){
					console.log(err);
				}
				else{
					cloudinary.uploader.upload(req.file.path, (result) => {
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

// Delete
router.delete("/:id",middleware.isAdmin, (req,res) => {
	Opportunity.findById(req.params.id, (err,opportunity) => {
		if (err) {
			console.log(err);
		} else {		
			cloudinary.v2.uploader.destroy(opportunity.imageId, (err,deleteOpportunity) => {
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
	  