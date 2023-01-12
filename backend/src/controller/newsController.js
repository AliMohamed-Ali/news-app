const { fetchAllSources, fetchSubscribeNews } = require('../API/news');
const User = require('../models/userModel')

const getNewsFromSubscribed =async(req,res)=>{
    const {sources} = req.user
    try{
        if(sources.length>0){
            const allNews = await fetchSubscribeNews(sources.toString());
            res.status(200).json({news:allNews})
        }else{
            res.status(200).json({news:{articles:[]}})
        }
    }catch(err){
        res.status(500).json({error:"something went error"})
    }
    
}

const getAllSources = async(req,res)=>{
    const {sources} = req.user;
    try{
    const AllSources = await fetchAllSources();
    if(!AllSources){
        res.status(500).json({error:"faild to fetch data"})
    }
    const mapedSources = AllSources.map(src=>{
        if(sources.includes(src.id)){
            return {...src,isSubscribed :true}
        }
        return {...src,isSubscribed :false}
    });
    res.status(200).json({sources : mapedSources})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

const subSources =async(req,res)=>{
    const user = req.user;

    const {id:sourceId} = req.params;
    try{
        if(user.sources.includes(sourceId)){
           return res.status(400).json({error:"This already subscribed"})
        }
        user.sources.push(sourceId);
        await user.save();
        res.status(200).json({sources : user.sources})
    }catch(err){
        res.status(500).json({error:"some thing went wrong"})
    }
}

const unSubSources =async(req,res)=>{
    const user = req.user;

    const {id:sourceId} = req.params;
    try{
        if(!user.sources.includes(sourceId)){
           return res.status(400).json({error:"This id is not subscribed"})
        }
        user.sources = user.sources.filter(src=>src !== sourceId);
        await user.save();
        res.status(200).json({sources : user.sources})
    }catch(err){
        res.status(500).json({error:"some thing went wrong"})
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
        console.log(popularSources)
        res.status(200).json({popularSources})
    }catch(err){
        res.status(500).json({error:"something went error"})
    }
}



module.exports= { getNewsFromSubscribed,getAllSources,subSources ,unSubSources,popularSources}