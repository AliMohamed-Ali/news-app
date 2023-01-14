const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const logger = require('../helper/logger');

//create Token
const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:"3d"});
}
//login
const loginUser = async(req,res)=>{
    const {email,password}= req.body;
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
        logger.info(`success login: ${email}`)
        res.status(200).json({fullName:user.fullName,token});
    }catch(err){
        logger.error(`fail login: ${email}`)
        res.status(400).json({error:err.message})
    }

};
//signup
const signupUser = async(req,res)=>{
   const {fullName,email,password} = req.body;
   try{
    const user =await User.signup(fullName,email,password);
    const token = createToken(user._id);
    logger.info(`success signup email:${email}`)
    res.status(200).json({fullName,token});
   }catch(err){
    logger.error(`fail signup email:${email}`)
    res.status(400).json({error:err.message})
   }
};

module.exports = { loginUser,signupUser };