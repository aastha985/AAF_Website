const express = require("express"),
	  router = express.Router();

router.get("/",function(req,res){
	res.render("explore/index");
});

module.exports = router;

