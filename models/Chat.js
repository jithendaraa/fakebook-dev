const mongoose = require('mongoose');
const { Schema } = mongoose;                         // Same as const Schema = mongoose.Schema destructuring

const chatSchema = new Schema({
    fromId: String,
    toId: String,
    fromName: String,
    toName: String,
    message: String
});

mongoose.model('chats', chatSchema);