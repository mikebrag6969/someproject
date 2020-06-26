var express = require("express");
var router = express.Router({ mergeParams: true });
var fashionItem = require("../models/fashionItem");
var Comment = require("../models/comment");
var middleware = require("../middleware");

/* Comments new*/
router.get("/new", middleware.isLoggedIn, function (req, res) {
    fashionItem.findById(req.params.id, function (err, foundFashionItem) {
        if (err) {


        } else {
            console.log(foundFashionItem);

            res.render("comments/new", { fashionItem: foundFashionItem });
        }

    })

});

/* Comments create*/
router.post("/", middleware.isLoggedIn, function (req, res) {
    fashionItem.findById(req.params.id, function (err, foundFashionItem) {
        if (err) {

        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "something went wrong!");
                } else {

                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundFashionItem.comments.push(comment);
                    foundFashionItem.save();
                    req.flash("success", "comment created successfully!");
                    res.redirect("/fashion/" + foundFashionItem._id);

                }

            })
        }

    })

});

/* Comments Edit*/
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    fashionItem.findById(req.params.id, function (err, foundFashionItem) {
        if (err || !foundFashionItem) {
            req.flash("error", "no item found");
            res.redirect("back");
        }
        else {
            Comment.findById(req.params.comment_id, function (err, foundComment) {
                if (err) {
                    res.redirect("back");
                }
                else {
                    res.render("comments/edit", { comment: foundComment, fashion_id: req.params.id })
                }
            })
        }

    });

});





/* Comments update*/
router.put("/:comment_id/", middleware.checkCommentOwnership, function (req, res) {

    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {

            res.redirect("back")
        }
        else {
            res.redirect("/fashion/" + req.params.id)

        }
    }

    );
});


router.delete("/:comment_id/", middleware.checkCommentOwnership, function (req, res) {

    Comment.findByIdAndDelete(req.params.comment_id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "comment deleted successfully!");
            res.redirect("/fashion/" + req.params.id)

        }

    });
})











module.exports = router;