const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//Tell passposrt to use new strategy for google login
passport.use(new googleStrategy({
    clientID : "492842999210-jt71n1kuuojvp6pg82k0v1tq2q67bnf9.apps.googleusercontent.com",
    clientSecret : "MATpvgXsTD0J4lJXd5jv5vPl",
    callbackURL : "http://localhost:8000/user/auth/google/callback"
},
    function(accessToken, refreshToken, profile, done){
        //Find a user
        User.findOne({
            //Profile will have users information
            email : profile.emails(0).value
        }).exec(function(err,user){
            if(err){
                console.log('Error in google-strategy-passport', err);
                return;
            }
            if(user){
                //if found, set this user as req.user
                return done(null,user);
            }else{
                //if not found, Create user and set it as req.user
                User.create({
                    name : profile.displayName,
                    email : profile.emails(0).value,
                    passport : crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){
                        console.log('Error in creating user',err);
                        return;
                    }
                    return done(null,user);
                })
            }
        });
    }
));
module.exports = passport;