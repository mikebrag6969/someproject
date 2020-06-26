
var middlewareObj = {}
var fashionItem = require("../models/fashionItem");
var Comment = require("../models/comment");


middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {

        return next();
    }
    req.flash("error", "you need to be logged in to do that!");
    res.redirect("/login");

}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err  || !foundComment) {
                console.log(err);
                req.flash("error", "comment not found - error");
                res.redirect("back");

            } else {
                if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                }
                else {
                    req.flash("error", "you dont have premission to do that!");
                    res.redirect("back")

                }

            }

        })
    }
    else {
        req.flash("error", "you need to be logged in to do that!");
        res.redirect("back");
    }
}






middlewareObj.checkItemOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        fashionItem.findById(req.params.id, function (err, foundFashionItem) {
            if (err || !foundFashionItem) {
                console.log(err);
                req.flash("error", "not found - error2");
                res.redirect("back")

            } else {
                if (foundFashionItem.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                }
                else {
                    req.flash("error", "you dont have premission to do that!");
                    res.redirect("back")

                }

            }

        })
    }
    else {
        req.flash("error", "you need to be logged in to do that!");
        res.redirect("back");
    }
}




module.exports = middlewareObj;
