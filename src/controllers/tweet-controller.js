
const { TweetService  } = require('../services');
const upload = require("../config/file-upload-s3.js");
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createTweet(req, res){
    const singleUploader = upload.single('image')
    try {
        // while creating no comments and likes would be there
        const data = req.body;
        console.log('tweet data : ',req.body);
        const response = await TweetService.createTweet(data);
        // singleUploader(req,res,async function(err,data){
        //     if(err){
        //         console.log(err)
        //     }
        //     console.log(req.file);
        //     const payload = {...req.body};
        //     payload.image = req.file.location;
        //     const response = await tweetService.create(payload);
        //     return res.status(201).json({
        //         success:true,
        //         message:"Successfully created a tweet",
        //         data: response,
        //         err:{}
        //     });

        // })
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

module.exports = {
    createTweet,
    getAllTweets,
    getTweet
}