const { LikeRepository, TweetRepository , CommentRepository} = require('../repositories')
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const likeRepository = new LikeRepository();
const tweetRepository = new TweetRepository(); 
const commentRepository = new CommentRepository(); 

async function toggleLike(data)
{
   try {
     let likeable;
     if(data.modelType === 'Tweet')
     {
        likeable = await tweetRepository.get(data.modelId);
 
     }
     else if(data.modelType === 'Comment')
     {
        
        likeable = await commentRepository.get(data.modelId);
     }
     else{
      throw new AppError(`ModelType is different`,StatusCodes.NOT_FOUND)
     }
   //   console.log('request : ',data);
     const exists = await likeRepository.findByUserAndLikeable({
        user:data.userId,
        onModel : data.modelType,
        likeable : data.modelId
     });
     console.log("if exists : ",exists);
     let isAdded;
     if(exists)
     {
         likeable.likes.pull(exists.id);
         await likeable.save();
         await likeRepository.delete(exists.id)
         console.log('exist like remove');
         isAdded = false;
    }
     else{
         const newLike = await likeRepository.create({
             user:data.userId,
             onModel : data.modelType,
             likeable : data.modelId
         });
         likeable.likes.push(newLike);
         await likeable.save();
         console.log('like added ');
         isAdded = true;
     }
     console.log('like added is true : ',isAdded);
     return isAdded;
   } catch (error) {
    console.log('like service error',error);
    throw new AppError(`Cannot make a like , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
   }
}

module.exports = {
    toggleLike,
}