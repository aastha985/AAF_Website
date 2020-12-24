const express = require('express'),
    router = express.Router(),
    Volunteer = require('../models/volunteer');

router.get("/",(req,res,next)=>{
    res.render("volunteering/index");
});

router.post("/new", (req,res,next)=>{
    Volunteer.create(req.body.volunteer, (err,volunteer)=>{
        if(err) next(err);
        req.flash("success", "Sent your details for review! Wait for a response from our team.");
        res.redirect("/explore");
    });
});

module.exports = router;