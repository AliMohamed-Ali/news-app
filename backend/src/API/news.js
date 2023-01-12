const instance = require("./axiosInstance");

const fetchAllSources = async()=>{
    const response = await instance.get(`top-headlines/sources`);
     return response.data.sources 
   
}
const fetchSubscribeNews = async(sources)=>{
    const response = await instance.get(`everything?sources=${sources}`);
     return response.data 
}
module.exports = {fetchAllSources,fetchSubscribeNews}