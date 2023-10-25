const express = require('express');
const { UserController } = require('../../controllers');
const { UserMiddlewares } = require('../../middlewares');
const router = express.Router();

router.post('/signup',UserMiddlewares.validateSignUpRequest,UserController.signup);
router.post('/signin',UserMiddlewares.validateSignInRequest,UserController.signIn);


router.get('/info',(req,res)=>{
    return res.json({msg:'router is setup'});
})

module.exports = router;
