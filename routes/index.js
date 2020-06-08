const 	express = require("express"),
		router= express.Router(),
	  	passport=require("passport"),
	  	User = require("../models/user"),
	  	middleware = require("../middleware");
	  
	
	  	
//root route
router.get("/",function(req,res){
	res.render("landing");
	// res.send("This will be the landing page soon");
});
router.get("/about",function(req,res){
	res.render("about");
});

//authentication routes

//show register form
router.get("/register",function(req,res){
	res.render("register");
});
//handle sign up logic
router.post("/register",function(req,res){
	// res.send("Signing you up...");
	var newUser = new User({username:req.body.username,name:req.body.name});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			 return res.redirect("/register");
		}
		else{
			passport.authenticate("local")(req,res,function(){
				return res.redirect("/");
			});
		}
	});
});

//show login form
router.get("/login",function(req,res){
	res.render("login");
});

//handle log in logic
router.post("/login",passport.authenticate("local",{
	successRedirect: "/",
	failureRedirect: "/login"}),
	function(req,res){
});

//logout route
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
	
});
module.exports = router;
	  