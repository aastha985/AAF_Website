const 	express = require("express"),
		router= express.Router(),
	  	passport=require("passport"),
	  	User = require("../models/user");
	  
	
	  	
//root route
router.get("/",function(req,res){
	res.render("landing");
	// res.send("This will be the landing page soon");
});
router.get("/about",function(req,res){
	res.render("about");
});

//authentication routes

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
				res.redirect("/");
			});
		}
	});
});

module.exports = router;
	  