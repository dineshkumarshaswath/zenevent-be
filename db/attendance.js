const mongoose=require("mongoose");

const attendanceSchema= new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        
    }, 
    date:{
        type:String,
        required:true
    }


})

const Register=mongoose.model("Register",attendanceSchema);
module.exports= Register