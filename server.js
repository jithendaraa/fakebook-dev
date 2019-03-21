const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');


//Models and Services
require('./models/User');
require('./models/Post');
require('./services/passport');

const PORT = process.env.PORT || 5000;

let chatApp = require('http').createServer();
let io = module.exports.io = require('socket.io')(chatApp);

const SocketManager = require('./SocketManager');

io.on('connection', SocketManager);

chatApp.listen(PORT, () => {
    console.log("Connected to port:" + PORT);
})




//Connect to Mongo using Mongoose
mongoose.connect(keys.mongoURI, { useNewUrlParser: true }).then(() => console.log("connected <3"));             //Not connecting on hostel wifi for some reason :/

//App Setup
const app = express();

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

//Route Handlers
require('./routes/authRoutes')(app);
require('./routes/postRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/frndRoutes')(app);

let socket = require('socket.io');









