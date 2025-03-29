const express =require("express");
const router =express.Router();
const warpAsync = require("../utils/warpAsync.js");
const expressError = require("../utils/expressError.js");
const {listingSchema}=require("../schema.js");
const listing =require("../models/listen.js");
const{isLoggedIn, isOwner,validatelisting}=require("../views/middleware.js");
const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} =require("../cloudConfig.js");
const upload = multer({storage });


router.route("/")
.get( warpAsync(listingController.index))
.post( isLoggedIn,
  upload.single("listing[image]"),
  validatelisting,
   warpAsync(listingController.createListings)
);
// .post( upload.single('listing[image][url]'),(req,res)=>{
//   res.send(req.file);
// })

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get( warpAsync(listingController.showListing))
.put(isLoggedIn,isOwner,
  upload.single("listing[image]"),
validatelisting, 
warpAsync(listingController.upadateListng)
)
  .delete(isLoggedIn,isOwner, warpAsync(listingController.deleteListing)
);

//edit route
router.get("/:id/edit",isLoggedIn,isOwner, warpAsync(listingController.createEdit));  

module.exports = router;