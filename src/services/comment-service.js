

const { CommentRepository, HashtagRepository, TweetRepository} = require('../repositories')

const hashtagRepository = new HashtagRepository();
const commentRepository = new CommentRepository();
const tweetRepository = new TweetRepository();

async function createComment(data)
{
    try{
        const content = data.content;
        const tags = content.match(/#+[a-zA-Z0-9(_)]+/g).map(tag => tag.substring(1).toLowerCase());
        const comment = await commentRepository.create(data);
        console.log('Comment created : ',comment);

        if(data.onModel === 'Tweet')
        {
            // storing the comment Id in tweet model 
            const tweetId = data.commentable;
            console.log('tweetId : ',tweetId);
            const tweet = await tweetRepository.get(tweetId);
            console.log('before updating comment in tweet : ',tweet);
            tweet.comments.push(comment.id);
            tweet.save();
            console.log('after updating comment in tweet : ',tweet);
        }
        else if(data.onModel === 'Comment'){
            // storing the comment Id in comment model 
            const commentId = data.commentable;
            console.log('comment id : ',commentId);
            const existComment = await commentRepository.get(commentId);
            console.log('exist comment details : ',existComment);
            existComment.commentable.push(comment.id);
            existComment.save();
            console.log('after updating comment in comment : ',existComment);
        }
        

        // storing the new hashtags ----
        const allPresentHashtags = await hashtagRepository.getHashtagByName(tags);
        let textOfPresentTags = allPresentHashtags.map(tags => tags.text);
        console.log('all present tags : ',textOfPresentTags);


        let newTags = tags.filter(tag => !textOfPresentTags.includes(tag));
        // framing the new tags object to bulk create
        newTags = newTags.map(tag => {
            return {
                text : tag,
                tweets : [comment.id], 
            } 
        });
        console.log('new tags',newTags);
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
        throw new AppError(`Not able to get all comments `,StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getComment(id)
{
    try {
        const response = await commentRepository.get(id);
        return response;
    } catch (error) {
        console.log('comment service get comment error',error);
        throw new AppError(`Not able to get the comment `,StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createComment,
    getAllComments,
    getComment
}