const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.content)
   {
        ErrorResponse.message = "Something went wrong while creating Tweet";
        ErrorResponse.error = new AppError(
        ["content not found in the oncoming request in the correct form"],
        StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  if (!req.body.userId) {
        ErrorResponse.message = "Something went wrong while creating Tweet";
        ErrorResponse.error = new AppError(
        ["userId not found in the oncoming request in the correct form"],
        StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  if (!req.body.onModel) {
        ErrorResponse.message = "Something went wrong while creating Comment";
        ErrorResponse.error = new AppError(
        ["onModel not found in the oncoming request in the correct form"],
        StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.commentable)
    {
        ErrorResponse.message = "Something went wrong while creating Comment";
        ErrorResponse.error = new AppError(
        ["commentable id not found in the oncoming request in the correct form"],
        StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  next();
}

module.exports = {
  validateCreateRequest
}