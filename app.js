const 	express = require("express"),
		app=express(),
		bodyParser = require("body-parser"),
	  	mongoose = require("mongoose"),
	  	Opportunity = require("./models/opportunity"),
	  	methodOverride = require("method-override");

const 	indexRoutes = require("./routes/index"),
	  	opportunityRoutes = require("./routes/opportunities"),
		exploreRoutes = require("./routes/explore");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
var url= process.env.DATABASEURL || "mongodb://localhost/parvaazparindey";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

app.use(indexRoutes);
app.use("/opportunities",opportunityRoutes);
app.use("/explore",exploreRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function (req,res) {
  console.log("Server started!");
});
