const express = require("express"),
	  router = express.Router();

//Index Route
router.get("/",function(req,res){
	// res.send("This will be oppurtunities page soon");
	res.render("opportunities/index");
});

module.exports = router;
	  