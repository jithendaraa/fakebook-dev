var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');                       //Pull a model out of userSchema 'users'

passport.serializeUser((user, done) => {                //Serialize user to cookie     
    done(null, user.id);
});

passport.deserializeUser((id, done) => {                        //Deserialize cookie to user
    User.findById(id).then(user => {
        done(null, user);
    });
});                          

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
    }, (accessToken, refreshToken, profile, done) => {

        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    done(null, existingUser);
                }
                else {
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            })
    })
);

