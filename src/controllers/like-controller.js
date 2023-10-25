
const passportAuth = require('../middlewares/jwt-middlewares');
const { LikeService  } = require('../services');
const passport = require('passport')
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function toggleLike(req, res){
    try {
        // passportAuth(passport,req.body.userId);
        // console.log('request object : ',req.authorization);
        const data = req.body;
        const response = await LikeService.toggleLike({
            userId: req.body.userId,
            modelType : req.body.modelType,
            modelId : req.body.modelId
        });

        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log('like controller create tweet error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}



module.exports = {
    toggleLike
}