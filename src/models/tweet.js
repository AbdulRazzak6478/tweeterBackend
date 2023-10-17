const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content:{
        type:String
    },
    likes:{
        type:Number
    },
    noOfRetweets:{
        type:Number
    },
    comment: {
        type:String
    },
});

const Tweet = mongoose.model('Tweet',tweetSchema);

module.exports = Tweet;