//import express from 'express'
const express=require("express")
const { allTopics, createTopics, editTopics, deleteTopics } = require("../controllers/classtopics")
const { isAuthenticated, authorizeRoles} = require("../controllers/auth.js")

//import { Topics } from '../db/classes.js';


  const router=express.Router()

  router.route("/topics").get(isAuthenticated,allTopics);
  router.route("/create").post(isAuthenticated,authorizeRoles('admin'),createTopics);
  router.route("/edit/:id").put(isAuthenticated,authorizeRoles("admin"),editTopics);
  router.route("/delete/:id").delete(isAuthenticated,authorizeRoles("admin"),deleteTopics)
  


module.exports=router
