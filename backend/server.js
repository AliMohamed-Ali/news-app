require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/userRouter');
const newsRouter = require('./routes/newsRouter');
const puplicRoutes = require('./routes/puplicRouter');
const app = express();
const mongoose = require('mongoose');
const requireAuth = require('./middleware/requireAuth');
const logger = require('./helper/logger');
const port = process.env.PORT;

//middleware
app.use(express.json());

//routes
app.use('/api/user',userRouter);

app.use('/api/popular-sources',puplicRoutes)
app.use('/api/news',requireAuth,newsRouter)


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(port,()=>logger.info(`connected to db && listeneing on port ${port}`));

    })
    .catch(err=>console.log(err))











