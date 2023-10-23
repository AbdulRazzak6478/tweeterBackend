const express = require('express');
const {  } = require('../../controllers');
const router = express.Router();

router.get('/comments');

router.get('/info',(req,res)=>{
    return res.json({msg:'router is setup'});
})

module.exports = router;
