require('dotenv').config();
require('express-async-errors');
const express = require('express');
const userRouter = require('./routes/userRouter');
const newsRouter = require('./routes/newsRouter');
const app = express();
const mongoose = require('mongoose');
const requireAuth = require('./middleware/requireAuth');
const logger = require('./helper/logger');
const { errorHandaler } = require('./middleware/errorHandler');
const port = process.env.PORT;

//middleware
app.use(express.json());

//routes
app.use('/api/user',userRouter);
app.use('/api/news',requireAuth,newsRouter)

app.use(errorHandaler)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(port,()=>logger.info(`connected to db && listeneing on port ${port}`));

    })
    .catch(err=>logger.error(err))











