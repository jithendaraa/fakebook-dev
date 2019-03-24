const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });


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
// const SocketManager = require('./SocketManager');


let users = {
  online: []
};

io.on('connection', (socket) => {
  console.log("Socket ID: " + socket.id);

  // socket.on("online", (id) => {
  //   console.log(id);
  //   if (!users.online.includes(id)) {
  //     users.online.push(id);
  //   }
  //     // socket.emit('online users', users.online);
  //   console.log(users.online);
  // });

  // socket.on("offline", (id) => {
  //   // if (users.online.includes(id)) {
  //   //   users.online.filter(e => e !== id)
  //   // }
  //   console.log(id)
  //   let pos = users.online.indexOf(id);
  //   if(pos != -1){
  //     users.online.splice(pos, 1);
  //   }
  //   // socket.emit('online users', users.online);
  //   console.log(users.online);
  // });
});

  
// });


server.listen(PORT, () => {
  console.log("listening on port 5000 -- server");
});

//Route Handlers
// require('./routes/authRoutes')(app);


                                                                            //Image Upload Route


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

app.post('/api/uploadPic', (req, res) => {

  console.log(req.body)
  res.send(req.body);

});

app.get('/api/logout', (req, res) => {
  console.log("logged out: " + req.user.id);
 
  let pos = users.online.toString().indexOf(req.user.id);
  if(pos != -1){
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


module.exports = {
  users
}


require('./routes/postRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/frndRoutes')(app);
require('./routes/imgRoutes')(app);



///////////logout problemsss








