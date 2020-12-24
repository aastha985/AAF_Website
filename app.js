const express = require("express"),
	  	http = require('http'),
    	https = require('https'),
		app=express(),
		bodyParser = require("body-parser"),
	  	mongoose = require("mongoose"),
	  	Opportunity = require("./models/opportunity"),
	  	Post = require("./models/post"),
	  	Comment = require("./models/comment"),
	  	flash = require("connect-flash"),
	  	passport = require("passport"),
	  	LocalStrategy = require("passport-local"),
	  	methodOverride = require("method-override"),
	  	User = require("./models/user");

const indexRoutes = require("./routes/index"),
	  	opportunityRoutes = require("./routes/opportunities"),
		exploreRoutes = require("./routes/explore"),
	  	commentRoutes = require("./routes/comments"),
		adminRoutes = require("./routes/admin"),
		volunteerRoutes = require("./routes/volunteer");  

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
var url= process.env.DATABASEURL || "mongodb://localhost/parvaazparindey";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Passport configuration
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

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.adminId = process.env.adminId;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/opportunities",opportunityRoutes);
app.use("/explore",exploreRoutes);
app.use("/explore/:id/comments",commentRoutes);
app.use("/admin",adminRoutes);
app.use("/volunteer",volunteerRoutes);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log(`Server is running on PORT ${PORT}`);
});

