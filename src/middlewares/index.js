
module.exports = {
    isAuthenticate : require('./authenticate'),
    TweetMiddlewares : require('./tweet-middlewares'),
    CommentMiddlewares : require('./comment-middlewares'),
    LikeMiddlewares : require('./like-middlewares'),
    UserMiddlewares : require("./user-middlewares")
}