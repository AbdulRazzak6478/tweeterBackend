
const { TweetService  } = require('../services');


async function createTweet(req, res){
    try {
        const data = req.body;
        const response = await TweetService.createTweet(data);

        return res.status(201).json({
            success: true,
            message : 'Successfully created a tweet',
            data:response,
            error:{}
        });
    } catch (error) {
        console.log('Tweet controller create tweet error : ',error);
        return res.status(201).json({
            success: false,
            message : 'something went wrong',
            data:{},
            error:error
        });
    }
}
async function getAllTweets(req, res){
    try {
        const data = req.body;
        const response = await TweetService.getAllTweets();

        return res.status(201).json({
            success: true,
            message : 'Successfully get a tweets',
            data:response,
            error:{}
        });
    } catch (error) {
        console.log('Tweet controller get all tweet error : ',error);
        return res.status(201).json({
            success: false,
            message : 'something went wrong',
            data:{},
            error:error
        });
    }
}
async function getTweet(req, res){
    try {
        const data = req.body;
        const response = await TweetService.getTweet(req.params.id);

        return res.status(201).json({
            success: true,
            message : 'Successfully get a tweets',
            data:response,
            error:{}
        });
    } catch (error) {
        console.log('Tweet controller get tweet error : ',error);
        return res.status(201).json({
            success: false,
            message : 'something went wrong',
            data:{},
            error:error
        });
    }
}

module.exports = {
    createTweet,
    getAllTweets,
    getTweet
}