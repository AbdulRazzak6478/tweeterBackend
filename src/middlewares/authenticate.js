const passport = require("passport");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { ErrorResponse } = require("../utils/common");
const { ServerConfig } = require("../config");
const { UserService } = require("../services");

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
    // const headers = req.headers['bearerToken']
    console.log("req headers", req.headers);
    const bearerHeader = req.headers['bearer-token'];
    // const bearerHeader = req.headers["authorization"];
    console.log("bearer token ", bearerHeader);
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      try {
        const response = await UserService.isAuthenticated(bearerToken);
        if (response) {
          console.log("user authenticated", response);
          req.user = response;
          next();
        }
      } catch (error) {
        ErrorResponse.data = error;
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "User not authorized for this action" });
      }
    } else {
      throw new AppError(
        ["Bearer-token or authorization  , jwt token is missing"],
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    ErrorResponse.data = error;
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
