//import express from 'express'
const express=require('express')
// import {dbConnection } from './dbconnection.js';
// import { userRouter } from './router/user.js';
//import dotenv from 'dotenv'
const dotenv=require("dotenv")
const dbConnection = require('./dbconnection')
// import { classRouter } from './router/topics.js';
// import {isAuthenticated  } from './controllers/auth.js';
const mydata=require("./router/user")
const classnote=require("./router/topics")
const studattend=require("./router/studentsattend")
const cors=require("cors")


const app=express()
dotenv.config()
app.use(express.json())
app.use(cors())

// dbConnection();
dbConnection();

const PORT=process.env.PORT



app.get("/",(req,res)=>{
    res.send("working fine");

    
})

app.use("/api",mydata)
app.use("/api", classnote)
app.use("/api",studattend)


app.listen(PORT,()=>console.log(`succesfully connected localhost:${PORT}`));