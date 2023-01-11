const express = require('express');
const router = express.Router();
const { getNewsFromSubscribed,getAllSources,subSources ,unSubSources} = require('../controller/newsController');

//home page
router.get('/',getNewsFromSubscribed)

//sources page
router.get('/sources',getAllSources);
router.patch('/sources/:id/subscribe',subSources);
router.patch('/sources/:id/unsubscribe',unSubSources);



module.exports = router;