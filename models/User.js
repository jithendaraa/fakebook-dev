const mongoose = require('mongoose');
const { Schema } = mongoose;                         // Same as const Schema = mongoose.Schema destructuring
const PostSchema = require('./Post');

const userSchema = new Schema({
    googleId: String,
    email: String,
    displayName: String,
    myFriends: Array,
    friendReqRec: Array,
    friendReqSent: Array,
    image: String
});

mongoose.model('users', userSchema);