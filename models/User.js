const mongoose = require('mongoose');
const { Schema } = mongoose;                         // Same as const Schema = mongoose.Schema destructuring
const PostSchema = require('./Post');

const userSchema = new Schema({
    googleId: String,
    email: String,
    displayName: String,
    myFriends: Array
});

mongoose.model('users', userSchema);