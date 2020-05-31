const 	express = require("express"),
		app=express(),
		bodyParser = require("body-parser");

const 	indexRoutes = require("./routes/index"),
	  	opportunityRoutes = require("./routes/opportunities");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.use(indexRoutes);
app.use("/opportunities",opportunityRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started!");
});
