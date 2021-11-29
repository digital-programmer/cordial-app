const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const User = require('../models/user');



// tell passport to use a new strategy to use google login
passport.use(new GoogleStrategy({
    clientID: "437767597437-kbcjlk14ciobc3dkcv01qh5u77hbd7tf.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},

    function (accessToken, refreshToken, profile, done) {

        // find a user
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log("Error in google strategy: ", err);
                return;
            }

            if (user) {
                // if user found, set this user as req.user
                return done(null, user);
            } else {
                // if no user found, create a user and set user as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                }, function (err, user) {
                    if (err) {
                        console.log("Error in creating user", err);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }

));

module.exports = passport;