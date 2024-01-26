// import mongoose module
const mongoose = require("mongoose");
// create teacher schema
const teacherSchema = mongoose.Schema({
    
    speciality:String,
    adress:String,
    userId:String ,
    cv:String,
    courses:[{courseId:String}],

    
    
});

// create Teacher Model
const teacher = mongoose.model("Teacher", teacherSchema);
// make Teacher exportable
module.exports = teacher;