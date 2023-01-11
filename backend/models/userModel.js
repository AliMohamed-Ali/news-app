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
    ]
    
});
userSchema.statics.signup = async function(fullName,email,password){
    const emailExists = await this.findOne({email});
    if(!fullName || !email || !password){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not avalid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }
    if(emailExists){
        throw Error("Email already in use")
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const user = await this.create({fullName,email,password:hash});
    return user;
}
userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error("All fields must be filled")
    }
    const user = await this.findOne({email});
    if(!user){
        throw Error("The email or password is not valid")
    }
    // console.log(user)
    const passwordValid = await bcrypt.compare(password,user.password);
    if(!passwordValid){
        throw Error("The email or password is not valid") 
    }
    return user;
}
module.exports = mongoose.model("User",userSchema)
