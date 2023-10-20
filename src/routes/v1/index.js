const express = require('express');
const router = express.Router();
const tweetRoutes = require('./tweet-routes');
const userRoutes = require('./user-routes');
const { LikeController } = require('../../controllers');
const authenticate = require('../../middlewares/authenticate');

router.use('/tweets',tweetRoutes);
router.use('/user',userRoutes);
router.use('/likes/toggle',authenticate,LikeController.toggleLike);

module.exports = router;
