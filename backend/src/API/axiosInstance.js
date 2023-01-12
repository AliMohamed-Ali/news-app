const axios = require("axios");
const instance = axios.create({
    baseURL: 'https://newsapi.org/v2/',
    headers : {
        "X-Api-Key": process.env.API_KEY
    }
  });

module.exports = instance;