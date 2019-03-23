const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');

//Models and Services
require('./models/User');
require('./models/Post');
require('./services/passport');

const PORT = process.env.PORT || 5000;

//Connect to Mongo using Mongoose
mongoose.connect(keys.mongoURI, { useNewUrlParser: true }).then(() => console.log("connected <3"));             //Not connecting on hostel wifi for some reason :/

//App Setup
let app = express();

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
let io = module.exports.io = socketio(server);
const SocketManager = require('./SocketManager');

io.on('connection', SocketManager);


server.listen(PORT, () => {
  console.log("listening on port 5000 -- server");
});

//Route Handlers
// require('./routes/authRoutes')(app);

let users = {
  online: []
};

app.get('/auth/google', passport.authenticate("google", {
  scope: ['profile', 'email']
})
);


app.get(
  '/auth/google/callback', 
  passport.authenticate('google'),
  (req, res) => {
    
      if(users.online.length == 0){
          users.online.push(req.user._id);

      }
      else if(users.online.length >= 1){
          if(users.online.includes(req.user._id)){
            console.log("This id is already active");
          }
          else{
            users.online.push(req.user._id);
          }
      }
      let id = req.user._id;
     
      
      console.log("Logged in Users: " + users.loggedIn)
      console.log(users.online);

      res.redirect('/')
  }
);

app.get('/api/logout', (req, res) => {
  console.log("logged out: " + req.user.id);
  
  users.online.splice(req.user._id, 1);
  console.log(users.online)
  
  req.logout();
  res.redirect('/');
  
});

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});


module.exports = {
      users
}


require('./routes/postRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/frndRoutes')(app);













