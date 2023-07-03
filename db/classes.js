//import mongoose from "mongoose";

//import jwt from "jsonwebtoken"
const mongoose=require("mongoose")

const {ObjectId}=mongoose.Schema
const  classtopics = new mongoose.Schema({

    topics:{
        type:String,
        required:true,
        maxlength:100,
        trim:true
    },
    topicdate:{
        type:String,
        required:true, 
       unique:true,
       trim:true,
    },
    content:{
        type:String,
        required:true

    },
    preread:{
        type:String,
       
    },
    user:{
        type:ObjectId,
        ref:'user'
    }

})


//   function generatejwttoken(id){
//       return jwt.sign({id},process.env.SECRET_KEY);

//   }


const Topics=mongoose.model("topics",classtopics);

module.exports=Topics