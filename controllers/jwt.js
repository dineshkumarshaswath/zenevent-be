const jwt=require("jsonwebtoken");


exports.generatejwttoken=(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY);

}
