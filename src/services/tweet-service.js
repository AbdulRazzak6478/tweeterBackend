const { TweetRepository , HashtagRepository, CommentRepository, LikeRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const tweetRepository = new TweetRepository();
const hashtagRepository = new HashtagRepository();
const commentRepository = new CommentRepository();
const likeRepository = new LikeRepository();

async function createTweet(data)
{
    try {
        const content = data.content;
        const tags = content.match(/#+[a-zA-Z0-9(_)]+/g).map(tag => tag.substring(1).toLowerCase());
        const tweet = await tweetRepository.create(data);

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
        console.log('tweet details : ',tweet);

        // deleting tweet
        // const response = await tweetRepository.delete(id);
        
        console.log('all comments : ',tweet.comments);
         // to delete likes
        tweet?.likes.forEach(async (likeId)=>{
            const like = await LikeRepository.delete(likeId);
            console.log('like deleted : ',like);
        })
        // to delete comments
        tweet?.comments.forEach(async(commentId)=>{
            const cmt = await commentRepository.delete(commentId);
            console.log('comment deleted from comment model',cmt);
        });

        // deleting tweet from hashtags also
        const tags = tweet.content.match(/#+[a-zA-Z0-9(_)]+/g).map(tag => tag.substring(1).toLowerCase());
        const hashtags = await hashtagRepository.getHashtagByName(tags);
        console.log('all hashtags : ',hashtags);
        console.log('hashtags length : ',hashtags[0].tweets.length);
        hashtags.forEach((tag) => {
            tag.tweets.pull(tweet.id);
            tag.save();
        })
        console.log('all hashtags :',hashtags[0]);
        console.log('hashtags length : ',hashtags[0].tweets.length);

        
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
