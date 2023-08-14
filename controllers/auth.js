
// import  jwt  from 'jsonwebtoken';
 
const jwt=require("jsonwebtoken")


const { generatejwttoken, sendMail } = require("./jwt")
const User=require("../db/user")
const bcrypt=require("bcrypt")
const crypto=require("crypto")
 
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



        exports.forgotUser=async (req, res) => {
  
            try {
              
              const user = await User.findOne({email:req.body.email})
              if (!user) {
                return res.status(404).json({ error: "invalid crenditials" });
              }
          
         //this is the function for the reset token
              const resetToken = user.getResetToken();
              await user.save({validateBeforeSave:false})
              
              const resetUrl = `https://zeneventclone.netlify.app/reset/password/${resetToken}`;
        //send the reseturl
        
              const message = `Your password reset url is as follows \n\n 
              ${resetUrl} \n\n If you have not requested this email, then ignore it.`;
              await user.save();
        //send the mail with nodemailer package
        
              sendMail({  email: user.email, subject: "Reset the password",  message})
        
               return res.status(200).json({ message: `Email sent to ${user.email}`
            })
        
            //here is the catching the error field
            } catch (error) {
              console.error('server error', error);
               return res.status(500).json({ message: 'Internal server error' });
            }
          }




          exports.resetUser=async (req, res) => {

            const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex'); 
              try {
        
         //here is the find the user details with token
        
                const user = await User.findOne({
                  resetPasswordToken,
                  resetPasswordTokenExpire: { $gt: Date.now() },
                });
            
                if (!user) {
                  return res.status(404).json({ error: 'Invalid or expired token' });
                }
                
                if( req.body.password !== req.body.confirmPassword) {
                  return res.status(404).json({ error: 'Password does not match' });
                }
               
         //here is the hash the new password
                const salt= await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
            
              
                user.password = hashedPassword; 
                user.resetPasswordToken = undefined;
                user.resetPasswordTokenExpire = undefined;
        // here is the save the reset password and the token field
        
                await user.save(); 
        // this is the send the token to the user
        
                const token = generatejwttoken(user._id)
                   return res.status(200).json({  message:" successfully reset the password" })
              } catch (error) {
                console.error('server error', error);
                 return res.status(500).json({ error: 'Internal server error' });
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