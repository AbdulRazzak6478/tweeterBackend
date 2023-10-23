const express = require('express');
const router = express.Router();
const { LikeController } = require('../../controllers');
const authenticate = require('../../middlewares/authenticate');
const { info } = require('../../controllers/info-controller');

const tweetRoutes = require('./tweet-routes');
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');

router.use('/comments',commentRoutes);
router.use('/tweets',tweetRoutes);
router.use('/user',userRoutes);
router.use('/likes/toggle',authenticate,LikeController.toggleLike);

router.get('/info',info) 

module.exports = router;
