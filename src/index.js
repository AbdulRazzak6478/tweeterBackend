const { Logger, ServerConfig, DB} = require('./config')
const express = require('express');
const Tweet = require('./models/tweet');
const Hashtag = require('./models/hashtag');
const { TweetRepository } = require('./repositories');
const apiRoutes = require('./routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT,async ()=>{
    console.log(`Successfully started the server on PORT ${ServerConfig.PORT} `);
    Logger.info("Successfully started server", {});
    await DB.DBconnect();
}); 