const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required : true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    onModel : {
        type:String,
        required : true,
        enum : ['Tweet','Comment'],
    },
    commentable : [
        {
            type : mongoose.Types.ObjectId,
            required : true,
            refPath : 'onModel'
        }
    ]
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;