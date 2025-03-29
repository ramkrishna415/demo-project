const { query } = require("express");
const listing =require("../models/listen");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });





module.exports.index = async(req,res)=>{
    let all= await listing.find({});
   res.render("listings/index.ejs",{all});
   };

   module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing = async(req,res)=>{
    let{id} =req.params;
    const list= await listing.findById(id)
    .populate(         // "reviews")

    {path:"reviews",
        populate: {path:"author",

        },
    })

    .populate("owner");
    if(!list){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(list);
  res.render("listings/show.ejs",{list});
};

module.exports.createListings = async(req, res,next) => {
   let response = await geocodingClient.forwardGeocode({
    query:req.body.listing.location,
    limit:1,
   }) 
   .send();  
  
  
  
  
  let url = req.file.path;
      let filename = req.file.filename;

        const st = new listing(req.body.listing);
         st.owner =req.user._id;
         st.image ={url, filename};
        st.geometry = response.body.features[0].geometry;

         let saveListing =  await st.save();
         console.log(saveListing);
        req.flash("success","New Listing created");
        res.redirect("/listings");
};


module.exports.createEdit = async(req,res)=>{
    let {id} =req.params;
    
  const listi= await listing.findById(id);
  if(!listi){
    req.flash("error","Listing you requested for does not exist!");
    res.redirect("/listings");
  }
 let originalImageUrl = listi.image.url;
 originalImageUrl =originalImageUrl.replace("/upload","/upload/w_220");
  res.render("listings/edit.ejs",{listi,originalImageUrl});
};


module.exports.upadateListng = async(req, res)=>{
   
    let{id} =req.params;
    // await listing.findByIdAndUpdate(id,{...req.body.listi});
   let list = await listing.findByIdAndUpdate(id, { ...req.body.listing });
if(typeof req.file !== "undefined"){
   let url = req.file.path;
   let filename = req.file.filename;
        list.image ={url, filename};
        await list.save();
}
    req.flash("success"," Listing edit");
   res.redirect(`/listings/${id}`);
}


module.exports.deleteListing = async(req,res)=>{
    let{id} =req.params;
    let del= await listing.findByIdAndDelete(id); 
    req.flash("success"," Listing deleted");
    console.log(del);
    res.redirect("/listings");
}