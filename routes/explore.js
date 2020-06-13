const 	express = require("express"),
	  	router = express.Router(),
		Post = require("../models/post"),
	  	Comment = require("../models/comment"),
		middleware = require("../middleware");

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
  cloud_name: 'dqm7ezutf', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
//=====================================================================================

//index route
router.get("/",function(req,res){
	Post.find({"isApproved":true},function(err,Posts){
		if(err){
			console.log(err);
		}
		else{
			res.render("explore/index",{posts:Posts});
		}
	});
	
});

//new route
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("explore/new");
});

//create route
router.post("/",middleware.isLoggedIn,upload.single('image'),function(req,res){
	cloudinary.uploader.upload(req.file.path, function(result) {
  		req.body.post.image = result.secure_url;
		req.body.post.imageId = result.public_id;
		req.body.post.author = req.user;
		req.body.post.content = req.body.content;
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
	Post.findById(req.params.id).populate("comments likes").exec(function(err,foundPost){
		if(err || !foundPost){
			console.log(err);
			req.flash("error","Could not display the Post");
			return res.redirect("/explore");
		}
		else{
			res.render("explore/show",{post:foundPost});
		}
	});
});

//post like route
router.post("/:id/like",middleware.isLoggedIn,function(req,res){
	Post.findById(req.params.id,function(err,foundPost){
		if(err){
			console.log(err);
			req.flash("error","Could not like the post");
			return res.redirect("/explore");
		}
		else{
			var foundUserLike = foundPost.likes.some(function (like) {
				return like.equals(req.user._id);
			});
			if (foundUserLike) {
            // user already liked, removing like
				req.flash("success","Post Uniked");
				foundPost.likes.pull(req.user._id);
			} 
			else {
				// adding the new user like
				req.flash("success","Post Liked!");
				foundPost.likes.push(req.user);
			}
			foundPost.save(function (err) {
            if (err) {
                console.log(err);
				req.flash("error","Could not like the post");
                return res.redirect("/explore");
            }
			
            return res.redirect("/explore/" + foundPost._id);
        });
		}
	});
});

//edit route
router.get("/:id/edit",middleware.isAdmin,function(req,res){
	Post.findById(req.params.id,function(err,foundPost){
		if(err){
			console.log(err);
			req.flash("error","Cannot find the Post");
			return res.redirect("/explore");
		}
		else{
			res.render("explore/edit",{post:foundPost});
		}
	})
});
//update
router.put("/:id",middleware.isAdmin,function(req,res){
	req.body.post.content = req.body.content;
	Post.findByIdAndUpdate(req.params.id,req.body.post,function(err,updatedPost){
			if(err){
				console.log(err);
			}
			else{
				req.flash("success","Post updated successfully");
				return res.redirect("/explore/"+req.params.id);
			}
		});
});

//imageedit route
router.get("/:id/imageedit",middleware.isAdmin,function(req,res){
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
router.put("/:id/image",middleware.isAdmin,upload.single('image'),function(req,res){
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
					post.save();
					req.flash("success","Image Replaced!");
					return res.redirect("/explore/"+req.params.id);
					
					});
				}
		}
	});
});


router.delete("/:id",middleware.isAdmin,function(req,res){
	Post.findById(req.params.id,async function(err,post){
		if(err){
			console.log(err);
			return res.redirect("/explore");
		}
		try{		
			await cloudinary.v2.uploader.destroy(post.imageId);
			await Comment.deleteMany({
      			_id: {
        		$in: post.comments
      			}
    		});
			post.remove();
			req.flash("success","Post deleted successfully!");
			return res.redirect("/explore");
		}
		catch(err){
			if(err){
				console.log(err);
				return res.redirect("/explore");
			}
	}
	});
});

module.exports = router;
