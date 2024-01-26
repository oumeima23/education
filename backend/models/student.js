// import mongoose module
const mongoose = require("mongoose");
// create student schema
const studentSchema = mongoose.Schema({
  

   
    userId:String,
    image:String,
    adress:String,
    coursesEvaluations:[
        {courseId:String , note:Number , evaluation:String}
    ]
});


// create Student Model
const student = mongoose.model("Student", studentSchema);
// make Student exportable
module.exports = student;