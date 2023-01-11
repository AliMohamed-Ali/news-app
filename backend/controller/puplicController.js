const User = require('../models/userModel');

const popularSources = async(req,res)=>{
    const topSources =await User.aggregate([
        {$project :{sources:1}},
        {$unwind:"$sources"},
        {$group:
            {
                "Count": {"$sum": 1},
                "_id":"$sources"
                
            }
        },
        {$sort:{"Count":-1}},
        {$limit:5},
        {
            $addFields:{"sources":"$_id"}
        },
        {$project :{sources:1,_id:0}}
    ])
    res.json({topSources})
}
module.exports = popularSources;