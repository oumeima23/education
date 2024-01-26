// import mongoose module
const mongoose = require("mongoose");
// create course schema
const courseSchema = mongoose.Schema({
    nom: String,
    description : String,
    duration : Number,
    teacherId:String,
    students:[{studentId:String}]
  
});

// create Course Model
const course = mongoose.model("Course", courseSchema);
// make Course exportable
module.exports = course;