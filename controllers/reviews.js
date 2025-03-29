const listing = require("../models/listen");
const Review = require("../models/review");

module.exports.createReviews = async(req,res)=>{
    let Listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    Listing.reviews.push(newReview);
     
      await newReview.save();
      await Listing.save();
      req.flash("success","Review created!");
     res.redirect(`/listings/${Listing._id}`);
  };

  module.exports.destroyReview = async(req,res)=>{
    let{ id , reviewId} = req.params;
    id = id.trim(); 
    await listing.findByIdAndUpdate(id,{$pull: { reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!");
    res.redirect(`/listings/${id}`);
}