const { TweetRepository , HashtagRepository, CommentRepository, LikeRepository, UserRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const tweetRepository = new TweetRepository();
const hashtagRepository = new HashtagRepository();
const commentRepository = new CommentRepository();
const likeRepository = new LikeRepository();
const userRepository = new UserRepository();

async function createTweet(data)
{
    try {
        const content = data.content;
        const tags = content.match(/#+[a-zA-Z0-9(_)]+/g).map(tag => tag.substring(1).toLowerCase());
        const tweet = await tweetRepository.create(data);

        // saving tweet on user model
        const user = data.userId;
        const userDetails = await userRepository.get(user);
        userDetails.tweets.push(tweet.id);
        userDetails.save();

        // storing the new hashtags ----
        const allPresentHashtags = await hashtagRepository.getHashtagByName(tags);
        let textOfPresentTags = allPresentHashtags.map(tags => tags.text);
        let newTags = tags.filter(tag => !textOfPresentTags.includes(tag));
        newTags = newTags.map(tag => {
            return {
                text : tag,
                tweets : [tweet.id],
            } 
        });
        const bulk = await hashtagRepository.bulkCreate(newTags);

        // storing tweet in present hashtags
        allPresentHashtags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        })
        return tweet;
    } catch (error) {
        console.log('tweet service create tweet error :',error);
        throw new AppError(`Not able to create tweet , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAllTweets()
{
    try {
        const response = await tweetRepository.getAll();
        return response;
    } catch (error) {
        console.log('tweet service get Tweets error',error);
        throw new AppError(`Not able to get all tweets , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getTweet(id)
{
    try {
        const response = await tweetRepository.get(id);
        return response;
    } catch (error) {
        console.log('tweet service get Tweet error',error);
        throw new AppError(`Not able to get Tweet , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function deleteTweet(id)
{
    try {
        // deleted from the comments also
        const tweet = await tweetRepository.get(id);

        // deleting tweet
        const response = await tweetRepository.delete(id);

        // deleting tweet from user profile
        const user = tweet.userId;
        const userDetails = await userRepository.get(user);
        userDetails.replies.pull(tweet.id);
        userDetails.save();
        
        // to delete likes
        tweet?.likes.forEach(async (likeId)=>{
            const like = await LikeRepository.delete(likeId);
        })
        // to delete comments
        tweet?.comments.forEach(async(commentId)=>{
            const cmt = await commentRepository.delete(commentId);
        });

        // deleting tweet from hashtags also
        const tags = tweet.content.match(/#+[a-zA-Z0-9(_)]+/g).map(tag => tag.substring(1).toLowerCase());
        const hashtags = await hashtagRepository.getHashtagByName(tags);
        hashtags.forEach((tag) => {
            tag.tweets.pull(tweet.id);
            tag.save();
        })

        return response;
        
    } catch (error) {
        console.log('tweet service delete Tweet error',error);
        throw new AppError(`Not able to delete Tweet , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createTweet,
    getAllTweets,
    getTweet,
    deleteTweet
}
