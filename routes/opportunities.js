const express = require("express"),
	  router = express.Router();

//Index Route
router.get("/",function(req,res){
	// res.send("This will be oppurtunities page soon");
	res.render("opportunities/index");
});

//Form for adding a new oppurtunity
router.get("/new",function(req,res){
	// res.send("This will be new form page soon");
	res.render("opportunities/new");
});

module.exports = router;
	  