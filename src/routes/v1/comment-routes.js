const express = require('express');
const { CommentController } = require('../../controllers');
const { CommentMiddlewares, isAuthenticate } = require('../../middlewares');
const router = express.Router();

// post the comment /comments/ POST {content,userId,onModel,commentable }
router.post('/',isAuthenticate,CommentMiddlewares.validateCreateRequest,CommentController.createComment);

// post the comment /comments/ GET get All comments
router.get('/',isAuthenticate,CommentController.getAllComments);

// post the comment /comments/:id GET get Comment 
router.get('/:id',isAuthenticate,CommentController.getComment);

// post the comment /comments/:id GET get Comment 
router.delete('/:id',isAuthenticate,CommentController.deleteComment);

router.get('/info',(req,res)=>{
    return res.json({msg:'router is setup'});
})

module.exports = router;
