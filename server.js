const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./models/User');
require('./models/Post');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true }).then(() => console.log("connected <3"));             //Not connecting on hostel wifi for some reason :/

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

require('./routes/authRoutes')(app);
require('./routes/postRoutes')(app);
require('./routes/userRoutes')(app);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);