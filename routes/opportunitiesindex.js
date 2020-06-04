const express = require("express"),
	  router = express.Router(),
	  Opportunity = require("../models/opportunity");
//index routes
router.get("/science",function(req,res){
	Opportunity.find({"category":1},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			res.render("opportunities/Categoriesindex/science",{opportunities:Opportunities});
		}
	});
	
	
});
router.get("/business",function(req,res){
	Opportunity.find({"category":2},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/business",{opportunities:Opportunities});
		}
	});
});
//index route
router.get("/legal",function(req,res){
	Opportunity.find({"category":3},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/legal",{opportunities:Opportunities});
		}
	});
});

router.get("/media",function(req,res){
	Opportunity.find({"category":4},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/media",{opportunities:Opportunities});
		}
	});
});
router.get("/humanities",function(req,res){
	Opportunity.find({"category":5},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/humanities",{opportunities:Opportunities});
		}
	});
});
router.get("/commerce",function(req,res){
	Opportunity.find({"category":6},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/commerce",{opportunities:Opportunities});
		}
	});
});
router.get("/school",function(req,res){
	Opportunity.find({"category":7},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/school",{opportunities:Opportunities});
		}
	});
});
router.get("/other",function(req,res){
	Opportunity.find({"category":8},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/other",{opportunities:Opportunities});
		}
	});
});
module.exports = router;