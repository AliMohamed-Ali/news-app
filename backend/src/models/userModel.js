const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        reuired:true
    },
    password:{
        type:String,
        reuired:true
    },
    sources:[
        {
            type:String
        }
    ],
    log:[
        {
            info:String,
            lastLogin:{
                type:Date,
                default:Date.now()
            }
        }
    ]   
});
userSchema.statics.signup = async function(fullName,email,password){
    const emailExists = await this.findOne({email});
    if(!fullName || !email || !password){
        throw new Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw new Error('Email is not avalid')
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('Password not strong enough')
    }
    if(emailExists){
        throw new Error("Email already in use")
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const user = await this.create({fullName,email,password:hash});
    return user;
}
userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw new Error("All fields must be filled")
    }
    const user = await this.findOne({email});
    if(!user){
        throw new Error("The email or password is not valid")
    }
    if(user.log.length >= 10){
        user.log.shift()
        
    }
    const passwordValid = await bcrypt.compare(password,user.password);
    if(!passwordValid){
        user.log.push({info:"login fail password not correct"});
        user.save()
        throw new Error("The email or password is not valid") 
    }
    user.log.push({info:"login success"});
    user.save()
    return user;
}
module.exports = mongoose.model("User",userSchema)
