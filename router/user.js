// import express from 'express'
// import bcrypt from 'bcrypt'
// import { User } from '../db/user.js'
// import { generatejwttoken } from '../db/user.js'
const express=require('express')

const { getfunction, signUser, loginUser, allUsers,
     forgotUser, resetUser } = require('../controllers/auth')


const router=express.Router()


router.route("/sample").get(getfunction);

router.route("/allusers").get(allUsers);
router.route("/signin").post(signUser);

router.route("/login").post(loginUser)
router.route("/forgot").post(forgotUser)
router.route("/reset/password/:token").post(resetUser)

module.exports=router


// router.use("/login",

// export const userRouter=router;