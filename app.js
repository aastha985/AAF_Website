const 	express = require("express"),
		app=express(),
		bodyParser = require("body-parser"),
	  	mongoose = require("mongoose"),
	  	Opportunity = require("./models/opportunity"),
	  	methodOverride = require("method-override");

const 	indexRoutes = require("./routes/index"),
	  	opportunityRoutes = require("./routes/opportunities");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://localhost/parvaazparindey");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

app.use(indexRoutes);
app.use("/opportunities",opportunityRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function (req,res) {
  console.log("Server started!");
});
