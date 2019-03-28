const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 5000;
let users = {
  online: []
};

//Models and Services
require('./models/User');
require('./models/Chat');
require('./models/Post');
require('./services/passport');

//Connect to Mongo using Mongoose
mongoose.connect(keys.mongoURI, { useNewUrlParser: true }).then(() => console.log("connected <3"));             //Not connecting on hostel wifi for some reason :/
const User = mongoose.model('users');
const Chat = mongoose.model('chats');

//App Setup
let app = express();

app.use(express.static(__dirname + 'public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

let server = http.Server(app)
let io = socketIo(server);

let onlineUsers = [];

io.on('connection', async (socket) => {
  console.log("New client connected with socket ID: " + socket.id);

  socket.on("online users", userObj => {
    onlineUsers.push(userObj);
    io.emit('online users', onlineUsers);
  });

  let chats = await Chat.find({});
  // console.log(chats)
  socket.emit('output', chats);


  //Listen for messages from client side
  socket.on('message', async textObj => {
    console.log("received on server")
    
    let chat = await new Chat({
      fromId: textObj.fromId,
      toId: textObj.toId,
      fromName: textObj.fromName,
      toName: textObj.toName,
      message: textObj.message
    }).save();
    // io.emit('message', textObj);
    let sendToClients = [];
    let i;
    console.log(onlineUsers.length)
    for(i=0; i<onlineUsers.length; i++){
      if((onlineUsers[i].userId.toString() == textObj.toId.toString()) || (onlineUsers[i].userId.toString() == textObj.fromId.toString())){
        if(onlineUsers[i].socketId.toString() !== socket.id.toString()){
          sendToClients.push(onlineUsers[i].socketId);
        }
      }
    }
    console.log(sendToClients)
    sendToClients.map(sendtoClient => {
      console.log(sendtoClient)
      io.to(`${sendtoClient}`).emit('message', textObj);
    //   socket.broadcast.to(sendtoClient).emit('message', textObj); //sending to individual socketid
    });
    

  });




  //Socket Disconnect
  socket.on("disconnect", () => {
    
    let i, pos;
    for(i=0; i<onlineUsers.length; i++){
      if(onlineUsers[i].socketId === socket.id){
        pos = i;
        console.log(onlineUsers.name + " disconnected of socketID" + onlineUsers.socketId);
      }
    }
    onlineUsers.splice(pos, 1);
    console.log(onlineUsers);
    io.emit('online users', onlineUsers)
    
  });
});

server.listen(PORT, () => {
  console.log("listening on port 5000 -- server");
});

//Auth Routes start

app.get('/auth/google', passport.authenticate("google", {
  scope: ['profile', 'email']
})
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    let id = req.user._id;
    if (!users.online.includes(id)) {
      users.online.push(id);
      console.log(users.online)
    }
    res.redirect('/')
  }
);


app.get('/api/logout', (req, res) => {
  console.log("logged out: " + req.user.id);
  let pos = users.online.toString().indexOf(req.user.id);
  if (pos != -1) {
    users.online.splice(pos, 1);
  }
  console.log(users.online)
  console.log("sa")
  req.logout();
  res.redirect('/');
});

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

//Auth Routes end


require('./routes/postRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/frndRoutes')(app);
require('./routes/imgRoutes')(app);
