require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/userRouter');
const newsRouter = require('./routes/newsRouter');
const mongoose = require('mongoose');
const requireAuth = require('./middleware/requireAuth');
const logger = require('./helper/logger');
const { errorHandaler } = require('./middleware/errorHandler');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
// require('express-async-errors');

const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));



//routes
app.use('/api/user',userRouter);
app.use('/api/news',requireAuth,newsRouter)

// app.use(errorHandaler)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(port,()=>logger.info(`connected to db && listeneing on port ${port}`));

    })
    .catch(err=>{
        logger.error(err)
        process.exit(1)
    })











