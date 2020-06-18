const 	express = require("express"),
		router= express.Router(),
	  	passport=require("passport"),
	  	User = require("../models/user"),
	  	async = require("async"),
		nodemailer = require("nodemailer"),
		crypto = require("crypto");
	  
app.get('*',function(req,res,next){ 
	if(req.headers['x-forwarded-proto']!='https') res.redirect('https://parvaaz-parindey.aafngo.org'+req.url); 
	else next(); 
});	
	  	
//root route
router.get("/",function(req,res){
	res.render("home");
});

//authentication routes

//show register form
router.get("/register",function(req,res){
	res.render("register");
});
//handle sign up logic
router.post("/register",function(req,res){
	// res.send("Signing you up...");
	var newUser = new User({username:req.body.username,name:req.body.name});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			req.flash("error",err.message);
			return res.redirect("/register");
		}
		else{
			passport.authenticate("local")(req,res,function(){
				req.flash("success","Welcome "+user.name);
				return res.redirect("/explore");
			});
		}
	});
});

//show login form
router.get("/login",function(req,res){
	res.render("login");
});

//handle log in logic
router.post("/login",passport.authenticate("local",{
	successRedirect: "/",
	failureRedirect: "/login"}),
	function(req,res){
});

//logout route
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged Out!")
	return res.redirect("/explore");
	
});

router.get("/forgot",function(req,res){
	res.render("forgot");
});

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ username: req.body.username }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'aafwebsitep@gmail.com',
          pass: process.env.GMAIL_PASSWORD
        }
      });
      var mailOptions = {
        to: user.username,
        from: 'aafwebsitep@gmail.com',
        subject: 'Parvaaz Parindey Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success', 'An e-mail has been sent to ' + user.username + ' with further instructions. If you don\'t not receive the email please check your spam folder.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {token: req.params.token});
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'aafwebsitep@gmail.com',
          pass: process.env.GMAIL_PASSWORD
        }
      });
      var mailOptions = {
        to: user.username,
        from: 'aafwebsitep@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello '+user.name+',\n\n' +
          'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/explore');
  });
});


module.exports = router;
	  