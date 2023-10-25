const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateLikeRequest(req, res, next) {
  if (!req.body.userId)
   {
        ErrorResponse.message = "Something went wrong while making Like";
        ErrorResponse.error = new AppError(
        ["userId not found in the oncoming request in the correct form"],
        StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  if (!req.body.modelType) {
        ErrorResponse.message = "Something went wrong while making Like";
        ErrorResponse.error = new AppError(
        ["modelType not found in the oncoming request in the correct form"],
        StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  if (!req.body.modelId) {
        ErrorResponse.message = "Something went wrong while making Like";
        ErrorResponse.error = new AppError(
        ["modelId not found in the oncoming request in the correct form"],
        StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
  next();
}

module.exports = {
  validateLikeRequest
}