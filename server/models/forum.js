const mongoose = require("mongoose");

let forumSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  threads: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Thread'
      }
  ]
});

module.exports = mongoose.model('Forum', forumSchema);