const express = require('express');
const { CommentController } = require('../../controllers');
const router = express.Router();

// post the comment /comments/ POST {content,userId,onModel,commentable }
router.post('/',CommentController.createComment);

// post the comment /comments/ GET get All comments
router.get('/',CommentController.getAllComments);

// post the comment /comments/:id GET get Comment 
router.get('/:id',CommentController.getComment);

router.get('/info',(req,res)=>{
    return res.json({msg:'router is setup'});
})

module.exports = router;
