const express = require("express"), router = express.Router(), Post = require("../models/post"), Opportunity = require("../models/opportunity"), middleware = require("../middleware");
const BlogCategories=require("../models/blogcategories")

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
const cloudinary = require('cloudinary');
const loginIssue = require("../models/loginIssue");
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Root route - Admin dashboard
router.get("/",middleware.isAdmin, (req, res) => {
	ModalImage.findOne({"toDisplay":true},(err,found)=>{
		if(found==null){
		  res.render("admin/index",{toggle:false,url:null})
		}
		else{
		  res.render("admin/index",{toggle:true,url:found.Url})
		}
  
	  })
});


// Blog categories route
router.get("/blogcategories",middleware.isAdmin, (req, res) => {
	res.render("admin/blogcategories");
});

//Blog categories add
router.post("/blogcategories", middleware.isAdmin, (req,res) => {
	BlogCategories.create({"name":req.body.category},(err,newBlogCategory)=>{
		if(err){
			console.log(err);
			return res.redirect("/admin/blogcategories")
		}
		else{
			req.flash("Successfully added");
			return res.redirect("/admin/blogcategories")
		}
	})
});

// Explore route
router.get("/explore",middleware.isAdmin, (req, res) => {
	Post.find({"isApproved":false}, (err, Posts) => {
		if(err){
			console.log(err);
			return res.redirect("/admin");
		}
		else{
			res.render("admin/postindex",{posts:Posts});
		}
	});
});

//complaints route
router.get("/complaints",middleware.isAdmin, (req, res) => {
	loginIssue.find({"resolved":false}, (err, Complaints) => {
		if(err){
			console.log(err);
			return res.redirect("/admin");
		}
		else{
			res.render("admin/complaintindex",{complaints:Complaints});
		}
	});
});


// Update route
router.put("/complaints/:id", middleware.isAdmin, (req,res) => {
	loginIssue.findById(req.params.id, (err,updatePost) => {
		if(err){
			console.log(err);
			return res.redirect("/admin");
		}
		else{
			updatePost.resolved = true;
			updatePost.save();
			// req.flash("success","Complaint Resolved!")
			return res.redirect("/admin/complaints");
		}
	});
});


//show route
router.get("/explore/:id", middleware.isAdmin, (req,res) => {
	Post.findById(req.params.id, (err,foundPost) => {
		if (err|| !foundPost ){
			console.log(err);
			res.render("/admin");
		} else{
			res.render("admin/postshow", {post:foundPost});
		}
	});
});



// Update route
router.put("/explore/:id", middleware.isAdmin, (req,res) => {
	Post.findById(req.params.id,req.params.post, (err,updatePost) => {
		if(err){
			console.log(err);
			return res.redirect("/admin");
		}
		else{
			updatePost.isApproved = true;
			updatePost.dateApproved = Date.now();
			updatePost.save();
			req.flash("success","Approved Post!")
			return res.redirect("/admin/explore");
		}
	});
});

// Delete route 
router.delete("/explore/:id", middleware.isAdmin, (req,res) => {
	Post.findById(req.params.id, (err,post) => {
		if(err){
			console.log(err);
			return res.redirect("/admin");
		} else {		
			cloudinary.v2.uploader.destroy(post.imageId, (err,deletePost) => {
				if(err){
					return res.redirect("/admin");
					console.log(err);
				}
				else{
					post.remove();
					req.flash("success","Deleted Post!");
					return res.redirect("/admin/explore");
				}
			});
		}
	});
});

// Pending opportunities
router.get("/opportunities", middleware.isAdmin, (req,res) => {
	Opportunity.find({"isApproved":false}, (err,Opportunities) => {
		if(err){
			console.log(err);
			return res.redirect("/admin");
		}
		else{
			res.render("admin/opportunityindex", {opportunities:Opportunities});
		}
	});
});

// Show route
router.get("/opportunities/:id",middleware.isAdmin, (req,res) => {
	Opportunity.findById(req.params.id, (err,foundOpportunity) => {
		if(err|| !foundOpportunity ){
			console.log(err);
			res.render("/admin");
		}
		else{
			res.render("admin/opportunityshow",{opportunity:foundOpportunity});
		}
	});
});

// Update Route  
router.put("/opportunities/:id", middleware.isAdmin, (req,res) => {
	Opportunity.findById(req.params.id, req.params.opportunity, (err,updateOpportunity) => {
		if(err){
			console.log(err);
			return res.redirect("/admin");
		}
		else{
			updateOpportunity.isApproved=true;
			updateOpportunity.dateApproved = Date.now();
			updateOpportunity.save();
			req.flash("success","Approved Opportunity!")
			return res.redirect("/admin/opportunities");
		}
	});
});

router.delete("/opportunities/:id", middleware.isAdmin, (req,res) => {
	Opportunity.findById(req.params.id, (err,opportunity) => {
		if(err){
			console.log(err);
			return res.redirect("/admin");
		} else{	
			cloudinary.v2.uploader.destroy(opportunity.imageId, (err,deleteOpportunity) => {
				if(err){
					console.log(err);
					return res.redirect("/admin");
				}
				else{
					opportunity.remove();
					req.flash("success","Deleted Opportunity!");
					res.redirect("/admin/opportunities");
				}
			});
		}
	});
});





module.exports = router;