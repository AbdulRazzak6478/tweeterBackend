
const { UserService  } = require('../services');


async function signup(req, res){
    try {
        const data = req.body;
        const response = await UserService.signup(data);

        return res.status(201).json({
            success: true,
            message : 'Successfully created a tweet',
            data:response,
            error:{}
        });
    } catch (error) {
        console.log('Tweet controller create tweet error : ',error);
        return res.status(500).json({
            success: false,
            message : 'something went wrong',
            data:{},
            error:error
        });
    }
}
async function signIn(req, res){
    try {
        const data = req.body;
        const response = await UserService.signIn(data);

        return res.status(201).json({
            success: true,
            message : 'Successfully user signIn',
            data:response,
            error:{}
        });
    } catch (error) {
        console.log('user controller create tweet error : ',error);
        return res.status(500).json({
            success: false,
            message : 'something went wrong',
            data:{},
            error:error
        });
    }
}


module.exports = {
    signup,
    signIn
}