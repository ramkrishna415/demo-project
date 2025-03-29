const Joi =require("joi");
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
title :Joi.string().required(),
description:Joi.string().required(),
location:Joi.string().required(),
country:Joi.string().required(),
price:Joi.number().required(),
// image:joi.string().allow("",null),
//     }).required()
image: Joi.object({
    filename: Joi.string().optional(),
    url: Joi.string().allow("").optional(), 
}).optional(),
}).required()
 });


module.exports.reviewSchema =Joi.object({
    review:Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment:Joi.string().required(),
    }).required()
 });




// const Joi = require("joi");

// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         location: Joi.string().required(),
//         country: Joi.string().required(),
//         price: Joi.number().required(),
//         image: Joi.object({
//             filename: Joi.string().optional(),
//             url: Joi.string().allow("").optional(),  // ✅ This allows an empty string
//         }).optional(),  // ✅ This makes the entire `image` object optional
//     }).required()
// });
