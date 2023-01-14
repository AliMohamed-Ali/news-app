const jwt = require("jsonwebtoken");
const logger = require("../helper/logger");
const User = require('../models/userModel');
const requireAuth = async(req,res,next)=>{
    try{
        const {authorization} = req.headers;
        if(!authorization)return res.status(401).json({error:"Authorization Token required"});
        const token = authorization.split(' ')[1];
        const {_id} = jwt.verify(token,process.env.SECRET);
        const user = await User.findOne({ _id });
        if(!user){
            res.status(401).json({error:"Request is not authorized"})
        }else{
            req.user = user;
            next()
        }
    }catch(err){
        res.status(500).json({error:"Something went error"})
    }
}

module.exports = requireAuth;