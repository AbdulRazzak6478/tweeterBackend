const express = require('express');
const { TweetController } = require('../../controllers');
const { TweetMiddlewares, isAuthenticate } = require('../../middlewares');
const router = express.Router();

router.post('/',TweetMiddlewares.validateCreateRequest,TweetController.createTweet);

router.get('/',TweetController.getAllTweets);

router.get('/:id',TweetController.getTweet);

router.delete('/:id',TweetController.deleteTweet);

router.get('/info',(req,res)=>{
    return res.json({msg:'router is setup'});
})

module.exports = router;
