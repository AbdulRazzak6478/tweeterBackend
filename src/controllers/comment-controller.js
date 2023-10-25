const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { CommentService } = require('../services')

async function createComment(req, res){
    try {
        const data = req.body;
        console.log("body : ",req.body);
        // const comments = [];
        // comments.push(req.body.commentable);
        // console.log('comments array ',comments, typeof comments);
        // req.body.commentable = comments;
        // console.log('comments : ',req.body);
        // return res.status(StatusCodes.OK).json(SuccessResponse);
        const response = await CommentService.createComment({
            content : req.body.content,
            user : req.body.userId,
            onModel : req.body.onModel,
            commentable : req.body.commentable,
        });

        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('Comment controller create comment error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function getAllComments(req, res){
    try {
        const data = req.body;
        const response = await CommentService.getAllComments();

        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('Comment controller get all comments error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getComment(req, res){
    try {
        const data = req.body;
        const response = await CommentService.getComment(req.params.id);

        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('Comment controller get all comments error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function deleteComment(req, res){
    try {
        const data = req.body;
        const response = await CommentService.deleteComment(req.params.id);

        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('Comment controller get all comments error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
module.exports = {
    createComment,
    getAllComments,
    getComment,
    deleteComment
}