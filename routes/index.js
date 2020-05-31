const express = require("express"),
	router= express.Router();
	  	
//root route
router.get("/",function(req,res){
	res.render("landing");
	// res.send("This will be the landing page soon");
});

module.exports = router;
	  