const Attendance = require("../db/attendance");
const Topics = require("../db/classes");



exports.allTopics=async(req,res)=>{
    try {
        const topics= await Topics.find();
    
        return res.status(200).json({message:"all topics",topics})


        
    } catch (error) {

     console.log('server error',error)
     return  res.status(500).json({message:'internal server error'})
    }
    
  }

  exports.createTopics=async(req,res)=>{

    try {
        const topics=  await new Topics({
           ...req.body,user:req.user._id

        }).save()
        return res.status(500).json({message:"topics create",topics})
        
    } catch (error) {
        console.log('server error',error)
        return  res.status(500).json({message:'internal server error'})
        
    }
  }

  exports.editTopics=async(req,res)=> {
    try {
        let updatequestions= await Topics.findOneAndUpdate({
            _id:req.params.id},
            {$set:req.body},{
                new:true})
    if(!updatequestions){
        return res.status(400).json({message:"error occured"})
    }
   return  res.status(201).json({message:'successfully updated'})
        
    } catch ( error) {
        console.log('server error',error)
     return  res.status(500).json({message:'internal server error'})
        
    }

}

exports.deleteTopics=async(req,res)=>{
    try {
        let deletequestions=await Topics.findByIdAndDelete(
            {_id:req.params.id})
            if(!deletequestions){
                return res.status(400).json({message:"error occured"})
            }
           return  res.status(201).json({message:'successfully deleted'})

        
    } catch (error) {
        console.log('server error',error)
        return  res.status(500).json({message:'internal server error'})
        
    }

}

exports.registerAttendance=async(req,res)=>{
    try {
        
         
         let attend = await Attendance({
            ...req.body
         }).save()

         return res.status(200).json({message:"successfully added",attend})
        
    } catch (error) {
        console.log('server error',error)
        return  res.status(500).json({message:'internal server error'})
        
    }
}

exports.getallStudents=async(req,res)=>{
    try {
         let allstudents= await Attendance.find()
         return res.status(200).json({messge:'successfully got attendance',allstudents})

    } catch (error) {
        console.log('server error',error)
        return  res.status(500).json({message:'internal server error'})
    }
}


