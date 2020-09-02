const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//We will use User as a model for authentication 
//so we'll need user model
const User = require('../models/user');

//We need to define a key for encryption/decryption
//Create options
let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codeial'
}

//Now tell passport to use jwt-strategy
passport.use(new JWTStrategy(opts, function(jwtPayload, done) {
    //Storing complete user info in payload in encrypted format
    User.findById(jwtPayload._id, function(err,user){
        if(err){
            console.log('Error in finding error from JWT');
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}));

module.exports = passport;