
const { TweetService  } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createTweet(req, res){
    try {
        // while creating no comments and likes would be there
        const data = req.body;
        const response = await TweetService.createTweet(data);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('Tweet controller create tweet error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function getAllTweets(req, res){
    try {
        const data = req.body;
        const response = await TweetService.getAllTweets();

        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('Tweet controller get all tweet error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function getTweet(req, res){
    try {
        const data = req.body;
        const response = await TweetService.getTweet(req.params.id);

        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('Tweet controller get tweet error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function deleteTweet(req, res){
    try {
        const data = req.body;
        const response = await TweetService.deleteTweet(req.params.id);

        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('Tweet controller delete tweet error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createTweet,
    getAllTweets,
    getTweet,
    deleteTweet
}