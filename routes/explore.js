const 	express = require("express"),
	  	router = express.Router(),
		Post = require("../models/post");

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

//index route
router.get("/",function(req,res){
	Post.find({},function(err,Posts){
		if(err){
			console.log(err);
		}
		else{
			res.render("explore/index",{posts:Posts});
		}
	});
	
});

//new route
router.get("/new",function(req,res){
	res.render("explore/new");
});

//create route
router.post("/",upload.single('image'),function(req,res){
	cloudinary.uploader.upload(req.file.path, function(result) {
  		req.body.post.image = result.secure_url;
		req.body.post.imageId = result.public_id;
		Post.create(req.body.post,function(err,newPost){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/explore");
			}
		});
	});
});
//show route
router.get("/:id",function(req,res){
	Post.findById(req.params.id,function(err,foundPost){
		if(err){
			console.log(err);
			res.redirect("/explore");
		}
		else{
			res.render("explore/show",{post:foundPost});
		}
	});
});


//edit route
router.get("/:id/edit",function(req,res){
	Post.findById(req.params.id,function(err,foundPost){
		if(err){
			console.log(err);
			res.redirect("/explore");
		}
		else{
			res.render("explore/edit",{post:foundPost});
		}
	})
});
//update
router.put("/:id",function(req,res){	Post.findByIdAndUpdate(req.params.id,req.body.post,function(err,updatedPost){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/explore/"+req.params.id);
			}
		});
});

//imageedit route
router.get("/:id/imageedit",function(req,res){
	Post.findById(req.params.id,function(err,foundPost){
		if(err){
			console.log(err);
			res.redirect("/explore");
		}
		else{
			res.render("explore/imageedit",{post:foundPost});
		}
	});
});
//update route for image
router.put("/:id/image",upload.single('image'),function(req,res){
	Post.findById(req.params.id,function(err,post){
		if(err){
			console.log(err);
		}
		else{
			cloudinary.v2.uploader.destroy(post.imageId);
				if(err){
					console.log(err);
				}
				else{
					cloudinary.uploader.upload(req.file.path, function(result) {
					post.image = result.secure_url;
					post.imageId = result.public_id;
					res.redirect("/explore/"+req.params.id);
					post.save();
					});
				}
		}
	});
});
router.delete("/:id",function(req,res){
	Post.findById(req.params.id,function(err,post){
		if(err){
			console.log(err);
		}
		else{		cloudinary.v2.uploader.destroy(post.imageId,function(err,deletePost){
				if(err){
					console.log(err);
				}
				else{
					post.remove();
					console.log("removed");
					res.redirect("/explore");
				}
			});
		}
	});
});
module.exports = router;
