const 	express = require("express"),
		app=express(),
		bodyParser = require("body-parser"),
	  	mongoose = require("mongoose"),
	  	Opportunity = require("./models/opportunity"),
	  	Post = require("./models/post"),
	  	passport = require("passport"),
	  	LocalStrategy = require("passport-local"),
	  	methodOverride = require("method-override"),
	  	User = require("./models/user");

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

//passport configuration
app.use(require("express-session")({
	secret: "Rusty is cute",
	resave: false,
	saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRoutes);
app.use("/opportunities",opportunityRoutes);
app.use("/explore",exploreRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function (req,res) {
  console.log("Server started!");
});
