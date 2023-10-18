const express = require('express');
const router = express.Router();
const tweetRoutes = require('./tweet-routes');

router.use('/tweets',tweetRoutes);

module.exports = router;
