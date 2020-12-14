let mongoose = require("mongoose");

let forumSchema = new mongoose.Schema({
    title: String,
    text: String,
    created: {type: Date, default: Date.now},
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model('Forum', forumSchema);