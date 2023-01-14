const { fetchAllSources, fetchSubscribeNews } = require('../API/news');
const client = require('../API/redisClient');
const User = require('../models/userModel')

const getNewsFromSubscribed =async(req,res)=>{
    const {_id,sources} = req.user || [];
    if(sources.length>0){
        const allNews = await fetchSubscribeNews(_id,sources.toString());
        res.status(200).json({news:allNews})
    }else{
        res.status(200).json({news:{articles:[]}})
    }
    
}

const getAllSources = async(req,res)=>{
    try{
    const {sources} = req.user|| [];
    const AllSources = await fetchAllSources();
    if(!AllSources){
        throw new Error("faild to fetch data")
    }
    const mapedSources = AllSources.map(src=>{
        if(sources.includes(src.id)){
            return {...src,isSubscribed :true}
        }
        return {...src,isSubscribed :false}
    });
    res.status(200).json({sources : mapedSources})
    }catch(err){
        res.status(500).json({error:"Something went error"})
    }
   
}

const subSources =async(req,res)=>{
    try{
        const user = req.user;
        const {id:sourceId} = req.params;
        if(user.sources.includes(sourceId)){
            res.status(400).json({error:"This already subscribed"})
        }
        user.sources.push(sourceId);
        await user.save();
        await client.del(`${user._id}-sources`);
        res.status(200).json({sources : user.sources})
    }catch(err){
        res.status(500).json({error:"Something went error"})
    }
}

const unSubSources =async(req,res)=>{
    try{
    const user = req.user;
    const {id:sourceId} = req.params;
    if(!user.sources.includes(sourceId)){
        res.statusCode=400
        throw new Error("This id is not subscribed")
    }
    user.sources = user.sources.filter(src=>src !== sourceId);
    await user.save();
    await client.del(`${user._id}-sources`);
    res.status(200).json({sources : user.sources})
    }catch(err){
        res.status(500).json({error:"Something went error"})
    }

}

const popularSources = async(req,res)=>{
        try{
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
            const popularSources = topSources.map((src)=>src.sources);
            res.status(200).json({popularSources})
        }catch(err){
            res.status(500).json({error:"Something went error"})
        }

}



module.exports= { getNewsFromSubscribed,getAllSources,subSources ,unSubSources,popularSources}