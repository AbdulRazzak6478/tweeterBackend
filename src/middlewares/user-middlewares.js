const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateSignUpRequest(req, res, next) {
  if (!req.body.email)
   {
        ErrorResponse.message = "Something went wrong while SignUp User";
        ErrorResponse.error = new AppError(
        ["email not found in the oncoming request in the correct form"],
        StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  if (!req.body.password) {
        ErrorResponse.message = "Something went wrong while SignUp User";
        ErrorResponse.error = new AppError(
        ["password not found in the oncoming request in the correct form"],
        StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  if(!req.body.name) {
        ErrorResponse.message = "Something went wrong while SignUp User";
        ErrorResponse.error = new AppError(
        ["name not found in the oncoming request in the correct form"],
        StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  if(!req.body.bio) {
        ErrorResponse.message = "Something went wrong while SignUp User";
        ErrorResponse.error = new AppError(
        ["bio not found in the oncoming request in the correct form"],
        StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  next();
}

function validateSignInRequest(req, res, next) {
  if (!req.body.email)
   {
        ErrorResponse.message = "Something went wrong while SignIn User";
        ErrorResponse.error = new AppError(
        ["email not found in the oncoming request in the correct form"],
        StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  if (!req.body.password) {
        ErrorResponse.message = "Something went wrong while SignIn User";
        ErrorResponse.error = new AppError(
        ["password not found in the oncoming request in the correct form"],
        StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  next();
}

module.exports = {
    validateSignUpRequest,
    validateSignInRequest
}