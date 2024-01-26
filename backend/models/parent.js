// import mongoose module
const mongoose = require("mongoose");
// create parent schema
const parentSchema = mongoose.Schema({
  

 
    userId:String,
    telChild:String,
    adress:String
});


// create Parent Model
const parent = mongoose.model("Parent", parentSchema);
// make Student exportable
module.exports = parent;