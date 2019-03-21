 const io = require('./server.js').io;

 module.exports = function(socket){
     console.log(socket.id);
 }