const express=require("express")
const { isAuthenticated, authorizeRoles } = require("../controllers/auth")
const { registerAttendance, getallStudents } = require("../controllers/classtopics")

const router=express.Router()

router.route("/allattend").get(isAuthenticated,authorizeRoles("admin"),getallStudents)
router.route("/postattend").post(isAuthenticated,registerAttendance)



module.exports=router