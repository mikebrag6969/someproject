var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    flash = require("connect-flash");
seedsDB = require("./seeds");


//require routes
var
    commentRoutes = require("./routes/comments"),
    fashionitemRoutes = require("./routes/fashionitems"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/recording_studio");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");


// seedsDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "mikey here",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    next();
});

app.use(indexRoutes);
app.use("/fashion", fashionitemRoutes);
app.use("/fashion/:id/comments/", commentRoutes);


app.listen(3000, function () {
    console.log("Started");


});
