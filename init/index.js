const mongoose =require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listen.js");

main().then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/mejor-project');
}

const  initDb =async() =>{
    await listing.deleteMany({});
     initData.data= initData.data.map((obj)=>({...obj
        ,owner: new mongoose.Types.ObjectId("67d2acc0a137fdcec5681abb"),
    }));
     await listing.insertMany(initData.data);
    console.log("data is inserting");
};
initDb();








// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listen.js"); 

// main()
//   .then(() => {
//     console.log("Connection successful");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/mejor-project");
// }

// const initDb = async () => {
//   // Ensure the owner field is converted to an ObjectId
//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: new mongoose.Types.ObjectId("67d2acc0a137fdcec5681abb"), // Convert owner to ObjectId
//   }));

//   await Listing.insertMany(initData.data);
//   console.log("Data is inserted successfully");
// };
// initDb();