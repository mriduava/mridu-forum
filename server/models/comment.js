const mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Comment', commentSchema);