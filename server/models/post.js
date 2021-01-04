const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    },
    created: {
      type: Date, 
      default: Date.now
    },
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model('Post', postSchema);