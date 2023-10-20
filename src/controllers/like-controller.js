
const passportAuth = require('../middlewares/jwt-middlewares');
const { LikeService  } = require('../services');
const passport = require('passport')

async function toggleLike(req, res){
    try {
        // passportAuth(passport,req.body.userId);
        // console.log('request object : ',req.authorization);
        const data = req.body;
        const response = await LikeService.toggleLike(data);

        return res.status(201).json({
            success: true,
            message : 'Successfully toggle a like',
            data:response,
            error:{}
        });
    } catch (error) {
        console.log('like controller create tweet error : ',error);
        return res.status(500).json({
            success: false,
            message : 'something went wrong in toggling a like',
            data:{},
            error:error
        });
    }
}



module.exports = {
    toggleLike
}