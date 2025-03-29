const express =require("express");
const router =express.Router({mergeParams:true});
const warpAsync = require("../utils/warpAsync.js");
const expressError = require("../utils/expressError.js");
 const Review = require("../models/review.js");
const listing =require("../models/listen.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../views/middleware.js");

const reviewControllers =require("../controllers/reviews.js")
//Reviews
//post review route
router.post("/",isLoggedIn, validateReview,warpAsync(reviewControllers.createReviews));
  //delete review route
  router.delete("/:reviewId",isLoggedIn, isReviewAuthor,warpAsync(reviewControllers.destroyReview));



  module.exports=router;
