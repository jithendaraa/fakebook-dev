const io = require('./server').io;
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('./client/src/socketFiles/Events');
const connectedUser = {};

const { createUser, createMessage, createChat } = require('./client/src/socketFiles/Factories');
const sourceFile = require('./server.js');

module.exports = function(socket){
    console.log("Socket ID: " + socket.id);
}

