const JWT = require('passport-jwt');
const { User } = require('../models');
const passport = require('passport')
const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'twitter_secret',
}

const passportAuth = (passport)=>{
    passport.use(new JwtStrategy(opts, async(jwt_payload, done)=>{
        console.log('before user data in jwt middle : ',jwt_payload);
        // const user = await User.findById(userId);
        const user = await User.findById('653158ad5da14f64428fa5a0');
        console.log('after user middle user details : ',user);
        if(!user)
        {
            done(null, false);
        }
        else{
            done(null, user);
        }
    }))
}
module.exports = passportAuth; 