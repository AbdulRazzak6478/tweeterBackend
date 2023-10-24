const { Logger, ServerConfig, DB} = require('./config')
const express = require('express');
const apiRoutes = require('./routes')
const passport = require('passport');
const passportAuth = require('./middlewares/jwt-middlewares.js');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passportAuth(passport);

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT,async ()=>{
    console.log(`Successfully started the server on PORT ${ServerConfig.PORT} `);
    Logger.info("Successfully started server", {});
    await DB.DBconnect();
}); 