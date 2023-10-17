const { Logger, ServerConfig, DB} = require('./config')
const express = require('express');
const Tweet = require('./models/tweet');
const Hashtag = require('./models/hashtag');
const { TweetRepository } = require('./repositories');

const app = express();

app.listen(ServerConfig.PORT,async ()=>{
    console.log(`Successfully started the server on PORT ${ServerConfig.PORT} `);
    Logger.info("Successfully started server", {});
    await DB.DBconnect();
    // Tweet.create({
    //     content:'this is my first tweet',
    //     likes:5,
    //     noOfRetweets:3,
    //     comment: 'this is my first comment',
    // })
    // Hashtag.create({
    //     text:'travel',
    //     tweets:'652e68af9f81c857986ee972'
    // })

    const tweetRepository = new TweetRepository();
    // const response = await tweetRepository.create({
    //     content:'this is my third tweet',
    //     likes:10,
    //     noOfRetweets:4,
    //     comment: 'this is my third comment',
    // });
    // console.log("tweet created : ",response);

    // const getAll = await tweetRepository.getAllTweets();
    // console.log("get all tweets : ",getAll);
    // const getTweet = await tweetRepository.get('652e68af9f81c857986ee972');
    // console.log("get all tweets : ",getTweet);
    // const deleteTweet = await tweetRepository.delete({"_id":'652e68af9f81c857986ee972'});
    // console.log("get all tweets : ",deleteTweet);
}); 