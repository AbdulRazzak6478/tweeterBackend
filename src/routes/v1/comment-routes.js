const express = require('express');
const { CommentController } = require('../../controllers');
const router = express.Router();

router.post('/',CommentController.createComment);

router.get('/info',(req,res)=>{
    return res.json({msg:'router is setup'});
})

module.exports = router;
