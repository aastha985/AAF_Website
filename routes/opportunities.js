const express = require("express"),
	  router = express.Router(),
	  Opportunity = require("../models/opportunity");

//Index Route
router.get("/",function(req,res){
	res.render("opportunities/index");
});

//Form for adding a new oppurtunity
router.get("/new",function(req,res){
	res.render("opportunities/new");
});

//create route
router.post("/",function(req,res){
	Opportunity.create(req.body.opportunity,function(err,newOpportunity){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/opportunities");
		}
	})
});

//index route
router.get("/science",function(req,res){
	// res.send("This will show opportunities for science and tech");
	Opportunity.find({},function(err,Opportunities){
		if(err){
			console.log(err);
		}
		else{
			res.render("opportunities/science/index",{opportunities:Opportunities});
		}
	});
	
});


module.exports = router;
	  