const User = require('../models/userModel')

const currentUser = async(id)=>{
    const user = await User.findById(id);
    return user
}
module.exports = {currentUser}