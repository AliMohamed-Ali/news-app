const errorHandaler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode).json({error:err.message})
}

module.exports = {
    errorHandaler
}