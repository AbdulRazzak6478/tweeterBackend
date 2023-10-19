const express = require('express');
const { UserController } = require('../../controllers');
const router = express.Router();

router.post('/signup',UserController.signup);
router.post('/signin',UserController.signIn);


router.get('/info',(req,res)=>{
    return res.json({msg:'router is setup'});
})

module.exports = router;
