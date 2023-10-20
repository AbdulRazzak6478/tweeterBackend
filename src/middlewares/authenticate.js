const passport = require('passport');
const jwt = require('jsonwebtoken');

function verifyToken(token){
    try {
        return jwt.verify(token,'twitter_secret');
    } catch (error) {
        console.log('verifytoken error ',error.message,error.name);
        throw error;
    }
}

function authenticate(req, res, next){
    // const headers = req.headers['bearerToken']
    console.log('req headers' ,req.headers);
    // const bearerHeader = req.headers['bearer-token'];
    const bearerHeader = req.headers['authorization'];
    console.log('bearer token ',bearerHeader);
    if(typeof bearerHeader !=='undefined')
    {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      try {
        const response = verifyToken(bearerToken);
        if(response)
        {
          console.log('user authenticated',response);
          req.user = response;
          next();
        }
      } catch (error) {
        return res.status(401).json({
            message:'Unauthorize access ,and token',
        })
      }
    }
    else {
         return res.status(401).json({
                    message:'Unauthorize access',
                })
    }
   
    // passport.authenticate('jwt',(err,user)=>{
    //     if(err)
    //     {
    //         next(err);
    //     }
    //     console.log('before auth',user,req.body);
    //     if(!user)
    //     {
    //         return res.status(401).json({
    //             message:'Unauthorize access',
    //         })
    //     }
    //     req.user = user;
    //     console.log('after auth is done',req.user);
    //     next();
    // })(req,res,next);
    // return res.status(401).json({
    //                 message:'Unauthorize access',
    //             })
}
module.exports = authenticate;