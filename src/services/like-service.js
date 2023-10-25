const { LikeRepository, TweetRepository , CommentRepository, UserRepository} = require('../repositories')
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const likeRepository = new LikeRepository();
const tweetRepository = new TweetRepository(); 
const commentRepository = new CommentRepository(); 
const userRepository = new UserRepository(); 

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
     console.log('request  : ',data);
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
         const user = await userRepository.get(data.userId);
         console.log('user before unLike : ',user.likes.length,user);
         user.likes.pull(exists.id);
         await user.save();
         console.log('user after unLike : ',user.likes.length,user);
      }
     else{
         const newLike = await likeRepository.create({
             user:data.userId,
             onModel : data.modelType,
             likeable : data.modelId
         });
         console.log('mew like : ',newLike);
         likeable.likes.push(newLike.id);
         await likeable.save();
         const user = await userRepository.get(data.userId);
         console.log('user before Like : ',user.likes.length,user);
         user.likes.push(newLike.id);
         await user.save();
         console.log('user after Like : ',user.likes.length,user);
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