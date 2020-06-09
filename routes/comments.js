const 	express = require("express"),
		router= express.Router({mergeParams:true}),
	  	Post = require("../models/post"),
	  	Comment = require("../models/comment"),
	  	middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req,res){
	Post.findById(req.params.id,function(err,foundPost){
		if(err){
			console.log(err);
			
			return res.redirect("/explore");
		}
		else{
			res.render("explore/comments/new",{post:foundPost});
		}
	});
});

router.post("/",middleware.isLoggedIn,function(req,res){
	//lookup campground using ID
	Post.findById(req.params.id,function(err,post){
		if(err){
			console.log(err);
			req.flash("error","Could not post your comment");
			res.redirect("/explore");
		}else{
			// create a new comment 
			Comment.create(req.body.comment,function(err,comment){
				if(err) console.log(err);
				else{
					//add username and id to comment
					//save comment
					
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.author.name = req.user.name;
					comment.save();
					//connect new comment to campground
					post.comments.push(comment);
					post.save();
					req.flash("success","Comment added");
					return res.redirect("/explore/"+post._id);
				}
			});
		}
	});
});

router.delete("/:comment_id",middleware.isAdmin,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			req.flash("error","Could not delete comment");
			return res.redirect("/explore/"+req.params.id);
		}
		else{
			req.flash("success","Successfully Deleted Comment");
			return res.redirect("/explore/"+req.params.id);
		}
	});
});

module.exports = router;
	  