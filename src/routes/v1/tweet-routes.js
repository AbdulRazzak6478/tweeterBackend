const express = require('express');
const { TweetController } = require('../../controllers');
const { TweetMiddlewares, isAuthenticate } = require('../../middlewares');
const router = express.Router();

router.post('/',isAuthenticate,TweetMiddlewares.validateCreateRequest,TweetController.createTweet);

router.get('/',isAuthenticate,TweetController.getAllTweets);

router.get('/:id',isAuthenticate,TweetController.getTweet);

router.delete('/:id',isAuthenticate,TweetController.deleteTweet);

router.get('/info',(req,res)=>{
    return res.json({msg:'router is setup'});
})

module.exports = router;
