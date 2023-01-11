const express = require('express');
const router = express.Router();
const popularSources = require('../controller/puplicController');

router.get('/',popularSources);



module.exports = router;