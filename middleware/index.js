const middlewareObj ={},
	  Opportunity = require("../models/opportunity"),
	  Post = require("../models/post"),
	  User = require("../models/user");

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please login first");
	return res.redirect("/login");
}
middlewareObj.isAdmin = function(req,res,next){
	if(req.isAuthenticated()){
		// if(req.user._id.equals("5edc9cb83ad90209f088b386")){
		// 	next();
		// }	
		if(req.user._id.equals("5edf4ecb87ba0600171de405")){
			next();
		}
		else{
			req.flash("error","You don't have permission to do that");
			return res.redirect("/explore");
		}
	}
	else{
		req.flash("error","Please login first");
		return res.redirect("/login");
	}
}

module.exports = middlewareObj;