// import mongoose from "mongoose";
const mongoose=require("mongoose");
// import jwt from "jsonwebtoken"
//const jwt=require("jsonwebtoken")
 

const usersSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true,
        maxlength:20,
        trim:true
    },
    email:{
        type:String,
        required:true, 
       unique:true,
       trim:true,
    },
    contact:{
        type:String,

    },
    role:{
        type:String,
        default:"user"
    },
    password:{
        type:String,
        required:true
    }

})



const User=mongoose.model("user",usersSchema);
module.exports=User