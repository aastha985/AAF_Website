const middlewareObj ={},
	  Opportunity = require("../models/opportunity"),
	  Post = require("../models/post"),
	  User = require("../models/user");

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
middlewareObj.isAdmin = function(req,res,next){
	if(req.isAuthenticated()){
		if(req.user._id.equals("5edc9cb83ad90209f088b386")){
			next();
		}
		else{
			return res.redirect("back");
		}
	}
	else{
		res.redirect("/login");
	}
}

module.exports = middlewareObj;