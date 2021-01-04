let mongoose = require("mongoose");

let forumSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    created: {type: Date, default: Date.now},
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    posts: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

module.exports = mongoose.model('Thread', forumSchema);