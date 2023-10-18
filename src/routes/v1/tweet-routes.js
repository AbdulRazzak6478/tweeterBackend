const express = require('express');
const { TweetController } = require('../../controllers');
const router = express.Router();

router.post('/',TweetController.createTweet);

router.get('/info',(req,res)=>{
    return res.json({msg:'router is setup'});
})

module.exports = router;
