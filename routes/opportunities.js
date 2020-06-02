const express = require("express"),
	  router = express.Router();

//Index Route
router.get("/",function(req,res){
	res.render("opportunities/index");
});

//Form for adding a new oppurtunity
router.get("/new",function(req,res){
	res.render("opportunities/new");
});

router.get("/science",function(req,res){
	// res.send("This will show opportunities for science and tech");
	res.render("opportunities/science/index");
});
module.exports = router;
	  