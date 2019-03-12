const mongoose = require('mongoose');
const { Schema } = mongoose;                         // Same as const Schema = mongoose.Schema called as destructuring

const PostSchema = new Schema({
    googleId: String,
    email: String,
    displayName: String,
    myFriends: Array,
    myPosts: Array
});

mongoose.model('', PostSchema);
