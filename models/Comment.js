const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
    // likes: [String],                            
    // dislikes: [String],
    // comment: String,
    // commentByUser: String,
    // replies: [String]
    comment: String
});

// mongoose.model('comments', CommentSchema);
module.exports = commentSchema;
