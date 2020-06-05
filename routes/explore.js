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

router.get("/new",function(req,res){
	res.render("explore/new");
});

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

module.exports = router;
