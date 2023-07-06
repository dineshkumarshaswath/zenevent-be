const mongoose=require("mongoose");

const attendanceSchema= new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
       
    },
    date:{
        type:String,
        required:true
    },


})

const Attendance=mongoose.model("attendance",attendanceSchema);
module.exports=Attendance