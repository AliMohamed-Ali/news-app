const instance = require("./axiosInstance");
const client = require("./redisClient");

const fetchAllSources = async()=>{
    try{
        const cachedSources = await client.get("sources");
        if(cachedSources){
            return JSON.parse(cachedSources)
        }
        const response = await instance.get(`top-headlines/sources`);
        client.set("sources",JSON.stringify(response.data.sources))
         return response.data.sources 
    }catch(err){
        res.status(500).json({error:"Something went error"})
    }
    
   
}
const fetchSubscribeNews = async(fullName,sources)=>{
    try{
        const cachedSources = await client.get(`${fullName}-sources`);
        if(cachedSources){
            return JSON.parse(cachedSources)
        }
        const response = await instance.get(`everything?sources=${sources}`);
        client.set(`${fullName}-sources`,JSON.stringify(response.data))
         return response.data
    }catch(err){
        res.status(500).json({error:"Something went error"})

    }
     
}
module.exports = {fetchAllSources,fetchSubscribeNews}