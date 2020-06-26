
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var fashionItem = require("../models/fashionItem");
router.get("/", function (req, res) {


    res.render("landing");

});


//AUTH ROUTES
router.get("/register", function (req, res) {
    res.render("register", { page: 'register' })
})

router.post("/register", function (req, res) {

    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar,

    });

    if (req.body.adminCode == "secret123") {
        newUser.isAdmin = true;
    }


    User.register(newUser, req.body.password, function (err, user) {

        if (err) {
            req.flash("error", err.message);
            res.redirect("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "welcome to our site" + user.username);
            res.redirect("/fashion");

        });



    }
    );
});



router.get("/login", function (req, res) {
    res.render("login", { page: 'login' })
})

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/fashion",
        failureRedirect: "/login",
        successFlash: 'Welcome!'
    }), function (req, res) {
        res.render("login")
    });


router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "you logged out!");
    res.redirect("/fashion");

});


//USER PROFILE 
router.get("/users/:id", function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
        if (err || !foundUser) {
            req.flash("error", "something went wrong")
            res.redirect("back");
        }
      

        fashionItem.find().where("author.id").equals(foundUser._id).exec(function(err, fashionCatalog) {
            if (err) {
                req.flash("error", "something went wrong")
                res.redirect("back");

            }
         
                res.render("users/show", { user: foundUser, fashionCatalog: fashionCatalog });
        
        });

 

    });


})




module.exports = router;