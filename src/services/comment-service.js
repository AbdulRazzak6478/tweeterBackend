

const { CommentRepository, HashtagRepository, TweetRepository, UserRepository} = require('../repositories')

const hashtagRepository = new HashtagRepository();
const commentRepository = new CommentRepository();
const tweetRepository = new TweetRepository();
const userRepository = new UserRepository();

async function createComment(data)
{
    try{
        const content = data.content;
        const tags = content.match(/#+[a-zA-Z0-9(_)]+/g).map(tag => tag.substring(1).toLowerCase());
        const comment = await commentRepository.create(data);

        // saving comment on user model
        const user = data.userId;
        const userDetails = await userRepository.get(user);
        userDetails.replies.push(comment.id);
        userDetails.save();

        if(data.onModel === 'Tweet')
        {
            // storing the comment Id in tweet model 
            const tweetId = data.commentable;
            const tweet = await tweetRepository.get(tweetId);
            tweet.comments.push(comment.id);
            tweet.save();
        }
        else if(data.onModel === 'Comment'){
            // storing the comment Id in comment model 
            const commentId = data.commentable;
            const existComment = await commentRepository.get(commentId);
            existComment.commentable.push(comment.id);
            existComment.save();
        }
        

        // storing the new hashtags ----
        const allPresentHashtags = await hashtagRepository.getHashtagByName(tags);
        let textOfPresentTags = allPresentHashtags.map(tags => tags.text);


        let newTags = tags.filter(tag => !textOfPresentTags.includes(tag));
        // framing the new tags object to bulk create
        newTags = newTags.map(tag => {
            return {
                text : tag,
                tweets : [comment.id], 
            } 
        });
        const bulk = await hashtagRepository.bulkCreate(newTags);

        // storing tweet in all ready present hashtags
        allPresentHashtags.forEach((tag) => {
            tag.tweets.push(comment.id);
            tag.save();
        })
        return comment;
    } catch (error) {
        console.log('comment service create comment error :',error);
        throw new AppError(`Not able to create comment , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAllComments()
{
    try {
        const response = await commentRepository.getAll();
        return response;
    } catch (error) {
        console.log('comment service get comments error',error);
        throw new AppError(`Not able to get all comments, ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getComment(id)
{
    try {
        const response = await commentRepository.get(id);
        return response;
    } catch (error) {
        console.log('comment service get comment error',error);
        throw new AppError(`Not able to get the comment ,${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function deleteComment(id)
{
    try { 
        const comment = await commentRepository.get(id);

        // delete comment
        const response = await commentRepository.delete(id);

        // deleting comment from user profile
        const user = comment.userId;
        const userDetails = await userRepository.get(user);
        userDetails.replies.pull(comment.id);
        userDetails.save();

        // deleting comment id from tweet
        const tweet = await tweetRepository.get(comment.commentable);
        tweet.comments.pull(comment.id);
        tweet.save()
        const updateTweet = await tweetRepository.update(tweet["_id"],tweet)

        // delete comment comments
        comment.commentable.forEach(async (cmt)=>{
            const deleted = await commentRepository.delete(cmt);
        })
        
        // delete hashtags
        const tags = comment.content.match(/#+[a-zA-Z0-9(_)]+/g).map(tag => tag.substring(1).toLowerCase());
        const hashtags = await hashtagRepository.getHashtagByName(tags);
        hashtags.forEach((tag) => {
            tag.tweets.pull(comment.id);
            tag.save();
        })

        return response;
    } catch (error) {
        console.log('comment service delete comment error',error);
        throw new AppError(`Not able to delete the comment ,${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createComment,
    getAllComments,
    getComment,
    deleteComment,
}