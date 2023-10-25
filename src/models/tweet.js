const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ],
    noOfRetweets:{
        type:Number
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    // image:{
    //     type:String,
    // }
});

const Tweet = mongoose.model('Tweet',tweetSchema);

module.exports = Tweet;