const express = require("express"), router = express.Router(), Opportunity = require("../models/opportunity");

// Index routes
router.get("/science", (req,res) => {
	Opportunity.find({ "isApproved": true, "category": 1 }, (err, Opportunities) =>{
		if (err) {
			console.log(err);
		} else {
			res.render("opportunities/Categoriesindex/science",{ opportunities: Opportunities });
		}
	});
});

router.get("/business", (req,res) => {
	Opportunity.find({"isApproved":true,"category":2}, (err, Opportunities) => {
		if (err){
			console.log(err);
		} else{
			 res.render("opportunities/Categoriesindex/business",{ opportunities: Opportunities });
		}
	});
});

// Index route
router.get("/legal",function(req,res){
	Opportunity.find({"isApproved":true,"category":3}, (err, Opportunities) => {
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/legal",{ opportunities: Opportunities });
		}
	});
});

router.get("/media",function(req,res){
	Opportunity.find({"isApproved":true,"category":4}, (err,Opportunities) => {
		if (err) {
			console.log(err);
		} else {
			 res.render("opportunities/Categoriesindex/media",{opportunities:Opportunities});
		}
	});
});

router.get("/humanities", (req,res) => {
	Opportunity.find({"isApproved":true,"category":5}, (err,Opportunities) => {
		if(err){
			console.log(err);
		} else {
			res.render("opportunities/Categoriesindex/humanities",{opportunities:Opportunities});
		}
	});
});

router.get("/governmentjobs", (req,res) => {
	Opportunity.find({"isApproved":true,"category":6}, (err,Opportunities) => {
		if(err){
			console.log(err);
		}
		else{
			 res.render("opportunities/Categoriesindex/commerce",{opportunities:Opportunities});
		}
	});
});

router.get("/school", (req,res) => {
	Opportunity.find({"isApproved":true,"category":7}, (err,Opportunities) => {
		if (err) {
			console.log(err);
		} else {
			res.render("opportunities/Categoriesindex/school",{opportunities:Opportunities});
		}
	});
});

router.get("/other",function(req,res){
	Opportunity.find({"isApproved":true,"category":8}, (err,Opportunities) => {
		if (err) {
			console.log(err);
		} else{
			res.render("opportunities/Categoriesindex/other",{opportunities:Opportunities});
		}
	});
});

module.exports = router;