const mongoose = require('mongoose');
const CommentSchema = require('./Comment');

const { Schema } = mongoose;                         // Same as const Schema = mongoose.Schema called as destructuring

const postSchema = new Schema({
    likes: [String],
    dislikes: [String],
    post: String,
    comments: [CommentSchema],
    _user: {type: Schema.Types.ObjectId, ref:'User'},
    postedOn: Date
});

mongoose.model('posts', postSchema);
// module.exports = postSchema;
