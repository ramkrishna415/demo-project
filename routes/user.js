const express =require("express");
const router =express.Router();
const User =require("../models/user.js");
const warpAsync = require("../utils/warpAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../views/middleware.js");

const userControllers =require("../controllers/users.js")

router.route("/signup")
.get(userControllers.renderSignupForm)
.post(warpAsync(userControllers.signup)
);

router.route("/login")
.get(userControllers.renderLoginFrom)
.post(saveRedirectUrl,
    passport.authenticate
    ("local",{failureRedirect:'/login',
        failureFlash:true
    }),
   userControllers.login );

router.get("/logout",userControllers.logout);

module.exports =router;