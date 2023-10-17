const { Logger, ServerConfig, DB} = require('./config')
const express = require('express');
const Tweet = require('./models/tweet');

const app = express();

app.listen(ServerConfig.PORT,async ()=>{
    console.log(`Successfully started the server on PORT ${ServerConfig.PORT} `);
    Logger.info("Successfully started server", {});
    // await DB.DBconnect();
    // Tweet.create({
    //     content:'this is my first tweet',
    //     likes:5,
    //     noOfRetweets:3,
    //     comment: 'this is my first comment',
    // })
}); 