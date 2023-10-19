const express = require('express');
const router = express.Router();
const tweetRoutes = require('./tweet-routes');
const userRoutes = require('./user-routes');

router.use('/tweets',tweetRoutes);
router.use('/user',userRoutes);

module.exports = router;
