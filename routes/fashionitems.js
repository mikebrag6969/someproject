var express = require("express");
var router = express.Router();
var fashionItem = require("../models/fashionItem");
var middleware = require("../middleware");


//INDEX - show all fashionitems
router.get("/", function (req, res) {
    var noMatch = null;
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        fashionItem.find({ name: regex }, function (err, fashionCatalog) {
            if (err) {

                console.log(err);
            }
            else {
                if (fashionCatalog.length < 1) {
                    noMatch = "No items match that query, please try again.";
                }
                res.render("fashionitems/index", { fashionCatalog: fashionCatalog, page: 'fashion', noMatch: noMatch });

            }
        });
    }
    else {
        fashionItem.find({}, function (err, fashionCatalog) {
            if (err) {

                console.log(err);
            }
            else {

                res.render("fashionitems/index", { fashionCatalog: fashionCatalog, page: 'fashion', noMatch: noMatch });

            }
        });

    }







});

//CREATE - adds fashion item to DB
router.post("/", middleware.isLoggedIn, function (req, res) {

    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var price = req.body.price
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newFashion = { name: name, price: price, img: image, desc: desc, author: author };


    fashionItem.create(newFashion, function (err, newCreated) {
        if (err) {


        } else {



            res.redirect("/fashion");

        }
    }

    );

});


//NEW - add new fashion item route
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("fashionitems/new");
});


//SHOW - show more info about fashion item
router.get("/:id", function (req, res) {

    fashionItem.findById(req.params.id).populate("comments").exec(function (err, foundFashionItem) {
        if (err || !foundFashionItem) {
            req.flash("error", "not found - error");
            res.redirect("back");
        }
        else {
            res.render("fashionitems/show", { fashionItem: foundFashionItem });
        }

    });


});


//EDIT - fashion item
router.get("/:id/edit", middleware.checkItemOwnership, function (req, res) {
    fashionItem.findById(req.params.id, function (err, foundFashionItem) {

        res.render("fashionitems/edit", { fashionItem: foundFashionItem })

    })
});


//UPDATE - fashion item 
router.put("/:id", middleware.checkItemOwnership, function (req, res) {
    fashionItem.findByIdAndUpdate(req.params.id, req.body.fashionitem, function (err, updatedFashionItem) {
        if (err) {

            res.redirect("/fashion")
        }
        else {

            res.redirect("/fashion/" + req.params.id)
        }

    })

});


//DESTROY - fashio item

router.delete("/:id", middleware.checkItemOwnership, function (req, res) {
    fashionItem.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/fashion")
        } else {
            res.redirect("/fashion")
        }
    })

});





function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



module.exports = router;