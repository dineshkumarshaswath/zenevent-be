
// import  jwt  from 'jsonwebtoken';
 
const jwt=require("jsonwebtoken")


const { generatejwttoken } = require("./jwt")
const User=require("../db/user")
const bcrypt=require("bcrypt")
 
 exports.isAuthenticated = async( req, res, next) => {
    try {
        if(req.headers){
            let token;
            token= await req.headers["x-auth-token"]
            if(!token){
                return res.status(400).json({message:"access denied"})
            }else{
            let decode= await jwt.verify(token,process.env.SECRET_KEY);
            req.user= await User.findById(decode.id);
            console.log(req.user)
            next()
            }
            
    
        }
        
    } catch (error) {
        console.log('server error', error)
        return res.status(500).json({ message: 'internal server error' })

        
    }
   

}


exports.authorizeRoles = (...roles)=>{
    try {
        
        return  (req,res, next)=>{
            if(!roles.includes(req.user.role)){
                return res.status(400).json({message :"you are not Authorize person"})
            }
            next()
        }
    } catch (error) {
        console.log('server error', error)
        return res.status(500).json({ message: 'internal server error' })

        
    }
   
}




exports.getfunction=(req,res)=>{
     return res.status(200).json({message:"successfully get logic"})
}

exports.signUser=async(req,res)=>{


    try {
        
        let user=await User.findOne({email:req.body.email})
    if(user){
        return  res.status(400).json({message:"user already existed"})
    }
    const salt= await bcrypt.genSalt(10);
    const hassedpassword=await bcrypt.hash(req.body.password,salt);
    
    user =await new User({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        password:hassedpassword

    }).save();
    //  return res.status(200).json({data:"successully added"})
     const token=generatejwttoken(user._id)
      return  res.status(201).json({message:"successfully logged in",token,user})



     } catch (error) {
         console.log('server error',error)
         return res.status(500).json({message:'internal server  error'})
     }
    



    }

    exports.loginUser=async(req,res)=>{
            try {
                const user =await User.findOne({email:req.body.email})
                if(!user){
                     return res.status(400).json({message:"invalid credentials"})
                }
                const validatepassword=await bcrypt.compare(
                    req.body.password,
                    user.password
                )
                if(!validatepassword){
                    return res.status(400).json({message:'invalid credentials'})
                }
                
                 const token=generatejwttoken(user._id)
                  return  res.status(201).json({message:'successfully logged in ',token,user})
            
              
            
            
              } catch (error) {
                console.log('server error',error)
                  return  res.status(500).json({message:'internal server error'})
                
                
               }
        
        
        }
        
exports.allUsers=async(req,res)=>{
    try {
        let allusers= await User.find()
        return res.status(200).json({message:"successfully loaded",allusers})
        
    } catch (error) {
        console.log('server error',error)
        return  res.status(500).json({message:'internal server error'})
      
    }
}