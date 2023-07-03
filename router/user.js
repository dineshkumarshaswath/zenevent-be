// import express from 'express'
// import bcrypt from 'bcrypt'
// import { User } from '../db/user.js'
// import { generatejwttoken } from '../db/user.js'
const express=require('express')

const { getfunction, signUser, loginUser, allUsers } = require('../controllers/auth')
// import { getfunction } from '../controllers/auth.js'

const router=express.Router()


router.route("/sample").get(getfunction);

router.route("/allusers").get(allUsers);
router.route("/signin").post(signUser);

router.route("/login").post(loginUser)


module.exports=router


// router.use("/login",

// export const userRouter=router;