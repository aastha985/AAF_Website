const express = require("express"), router = express.Router(), Post = require("../models/post"), Comment = require("../models/comment"), middleware = require("../middleware");
const blogcategories=require("../models/blogcategories")
// Multer setup
const multer = require('multer');
let storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = (req, file, cb) => {
    // Accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

var getIdfromUri = (uri) => {
	var s=uri.search("&id=");
	return uri.slice(s+4);
}

var getUri = (data) => {
	return data.heading.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')+"&id="+data._id
}

let upload = multer({ storage: storage, fileFilter: imageFilter});

// Cloudinary setup
const cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Index route
router.get("/", (req,res) => {
	blogcategories.find({}).sort('name').exec((err,categories)=>{

			Post.find({"isApproved":true}).sort('dateApproved').exec((err,Posts) => {
				if(err){
					console.log(err);
				}
				else{
					var counts=Posts.reduce((p,c)=>{
						var cat=c.category;
						if(!p.hasOwnProperty(cat))
							p[cat]=0;
						p[cat]++;
						return p;
					},{})
					var sum=0;
					categories.forEach((category)=>{
						if(!counts.hasOwnProperty(category.name))
							category.count=0;
						else{
							sum+=counts[category.name];
							category.count=counts[category.name];
						}
					})
					if(!req.query.category || req.query.category=="All"){
						req.query.category="All"
					}
					else{
						Posts=Posts.filter(a=>a.category==req.query.category);
					}
					categories[0].count=sum;
					res.render("explore/index",{posts:Posts,categories:categories,selectedCategory:req.query.category});
				}
			});
	});
});

// New route
router.get("/new", middleware.isLoggedIn, (req,res) =>{
	blogcategories.find({},(err,Categories)=>{
		res.render("explore/new",{categories:Categories});
	})
});

// Create route
router.post("/",middleware.isLoggedIn,upload.single('image'), (req,res) => {
	cloudinary.uploader.upload(req.file.path, (result) => {
		console.log(req.body);
  		req.body.post.image = result.secure_url;
		req.body.post.imageId = result.public_id;
		req.body.post.author = req.user;
		req.body.post.content = req.body.content;
		blogcategories.findById(req.body.post.category,(err,category)=>{
			req.body.post.category=category.name;
			Post.create(req.body.post,(err,newPost) => {
				if (err) {
					console.log(err);
				}
				else {
					res.redirect("/explore");
				}
			});
		})
		
	});
});

// Show route
router.get("/:uri", (req,res) => {
	id=getIdfromUri(req.params.uri);
	Post.findById(id).populate("comments likes").exec((err,foundPost) => {
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

// Like posts route
router.post("/:id/like",middleware.isLoggedIn, (req,res) => {
	Post.findById(req.params.id,(err,foundPost) => {
		if(err){
			console.log(err);
			req.flash("error","Could not like the post");
			return res.redirect("/explore");
		}
		else{
			let foundUserLike = foundPost.likes.some((like) => {
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
			foundPost.save( (err) => {
            if (err) {
                console.log(err);
				req.flash("error","Could not like the post");
                return res.redirect("/explore");
            }
			
            return res.redirect("/explore/" + getUri(foundPost));
        });
		}
	});
});

// Edit route
router.get("/:id/edit", middleware.isAdmin, (req,res) => {
	Post.findById(req.params.id, (err,foundPost) => {
		if(err){
			console.log(err);
			req.flash("error","Cannot find the Post");
			return res.redirect("/explore");
		}
		else{
			blogcategories.find({},(err,Categories)=>{
				res.render("explore/edit",{post:foundPost,categories:Categories});
			})
		}
	})
});

// Update route
router.put("/:id", middleware.isAdmin, (req,res) => {
	console.log(req.body.post.category)
	req.body.post.content = req.body.content;
	blogcategories.findById(req.body.post.category,(err,category)=>{
		req.body.post.category=category.name;
		Post.findByIdAndUpdate(req.params.id, req.body.post, (err,updatedPost) => {
			if(err){
				console.log(err);
			}
			else{
				req.flash("success", "Post updated successfully");
				return res.redirect(`/explore/${getUri(updatedPost)}`);
			}
		});
	})
	
});

// Image edit route
router.get("/:id/imageedit",middleware.isAdmin,(req,res) => {
	Post.findById(req.params.id,(err,foundPost) => {
		if(err){
			console.log(err);
			res.redirect("/explore");
		}
		else{
			res.render("explore/imageedit",{post:foundPost});
		}
	});
});

// Update route for image
router.put("/:id/image", middleware.isAdmin,upload.single('image'), (req,res) => {
	Post.findById(req.params.id, (err,post) => {
		if (err) {
			console.log(err);
		} else {
			cloudinary.v2.uploader.destroy(post.imageId);
			if(err){
				console.log(err);
			} else {
				cloudinary.uploader.upload(req.file.path, (result) => {
				post.image = result.secure_url;
				post.imageId = result.public_id;
				post.save();
				req.flash("success","Image Replaced!");
				return res.redirect("/explore/"+getUri(post));	
				});
			}
		}
	});
});

router.delete("/:id", middleware.isAdmin, (req,res) => {
	Post.findById(req.params.id,async (err,post) => {
		if(err){
			console.log(err);
			return res.redirect("/explore");
		} try {		
			await cloudinary.v2.uploader.destroy(post.imageId);
			await Comment.deleteMany({
      			_id: {
        		$in: post.comments
      			}
			});
			post.remove();
			req.flash("success","Post deleted successfully!");
			return res.redirect("/explore");
		} catch (err) {
			if(err){
				console.log(err);
				return res.redirect("/explore");
			}
		}
	});
});

module.exports = router;
