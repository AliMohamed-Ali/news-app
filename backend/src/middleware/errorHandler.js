const errorHandaler = (err,req,res,next)=>{
    const status = res.status ? res.status : 500

    res.status(status).json({message:err.message , stack:process.env.NODE_ENV == "production" ? null: err.stack })
}

module.exports = {
    errorHandaler
}