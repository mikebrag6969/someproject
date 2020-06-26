var mongoose = require("mongoose");
var fashionItem = require("./models/fashionItem");
var Comment = require("./models/comment");
 
var data = [
    {
        name: "classic man",
        img: "1.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "street man",
        img: "2.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "tough man",
        img: "3.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB() {
    //Remove all campgrounds
    fashionItem.remove({}, function (err) {
        // if (err) {
        //     console.log(err);
        // }
        // console.log("removed fashionItems!");
        // Comment.remove({}, function (err) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     console.log("removed comments!");
  
        //     data.forEach(function (seed) {
        //         fashionItem.create(seed, function (err, fashionItem) {
        //             if (err) {
        //                 console.log(err)
        //             } else {
        //                 console.log("added a campground");
                
        //                 Comment.create(
        //                     {
        //                         text: "This place is great, but I wish there was internet",
        //                         author: "Homer"
        //                     }, function (err, comment) {
        //                         if (err) {
        //                             console.log(err);
        //                         } else {
        //                             fashionItem.comments.push(comment);
        //                             fashionItem.save();
        //                             console.log("Created new fashionItem");
                                   
        //                         }
        //                     });
        //             }
        //         });
        //     });
        // });
    });
    //add a few comments
}

module.exports = seedDB;