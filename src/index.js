const { Logger, ServerConfig } = require('./config')
const express = require('express');

const app = express();

app.listen(ServerConfig.PORT,async ()=>{
    console.log(`Successfully started the server on PORT ${ServerConfig.PORT} `);
    Logger.info("Successfully started server", {});
}); 