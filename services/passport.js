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
    }, async (accessToken, refreshToken, profile, done) => {

        console.log(profile);
        console.log(profile.id);
        console.log(profile.displayName);
        console.log(profile.emails[0].value);
        // console.log(profile.gender)
        console.log("hi");
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            // console.log(profile);
            return done(null, existingUser);
        }
        else {
            const user = await new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                displayName: profile.displayName,
                myFriends: ["Jith", "Ajay"]
            }).save();
            done(null, user);
        }
    }
    )
);