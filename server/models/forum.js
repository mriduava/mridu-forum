let mongoose = require("mongoose");

let forumSchema = new mongoose.Schema({
    title: String,
    text: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Forum', forumSchema);