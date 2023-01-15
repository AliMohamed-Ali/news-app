const {createClient} = require('redis');

const client = createClient({url:`${process.env.REDIS_URI}`});

client.on("error",(err)=>console.log(err));
client.on("connect",()=>console.log(`Redis connected`));
client.connect()


module.exports = client;