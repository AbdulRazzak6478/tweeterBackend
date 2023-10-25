const passport = require("passport");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { ErrorResponse } = require("../utils/common");
const { ServerConfig } = require("../config");
const { UserService } = require("../services");
const jwt = require("jsonwebtoken");
// const jwt = require("jsonwebtoken");

function verifyToken(token) {
  try {
    return jwt.verify(token, ServerConfig.JWT_SECRET);
  } catch (error) {
    console.log("verifytoken error ", error.message, error.name);
    throw new AppError(
      `Invalid token , error in verifyToken`,
      StatusCodes.NOT_FOUND
    );
  }
}
async function authenticate(req, res, next) {
  try {
    const bearerHeader = req.headers['bearer-token'];
    if(!bearerHeader)
    {
      return res.status(401).json({message : 'bearer-token is missing'})
    }
    if (typeof bearerHeader !== "undefined") {
      // const bearer = bearerHeader.split(" ");
      // const bearerToken = bearer[1];
      const bearerToken = bearerHeader;
        const response = await UserService.isAuthenticated(bearerToken);
        if (response) {
          console.log("user authenticated", response);
          req.user = response;
          next();
        }
    } else {
      throw new AppError(
        ["Bearer-token : jwt token is missing"],
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error?.statusCode ? error.statusCode : StatusCodes.NOT_FOUND)
      .json(ErrorResponse);
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
