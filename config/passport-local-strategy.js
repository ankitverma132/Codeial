const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const { deserializeUser } = require('passport');
const user = require('../models/user');

//Authentication using passport
//Now tell passport to use this local strategy
passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback : true
    },
    function(req, email, password, done){
        //Find a user and establish the identity
        User.findOne({
            email : email
        }, function(err, user){
            if(err){
                req.flash('error',err);
                //console.log("Error in finding user --> Passport");
                return done(err);
            }
            //If user is not found or password doesn't match
            if(!user || user.password != password ){
                req.flash('error', 'Invalid username/password');
                //console.log('Invalid Username/Password');
                return done(null, false);
            }
            //If user is found
            return done(null,user);
        });
      }
    ));

//Serializing the user to decide which key is to be kept in cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//Deserializing the user from the key present in cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user --> Passport");
            return done(err);
        }
        return done(null, user);
    })
});

//check if the user is authenticated
//Work as middleware
passport.checkAuthentication = function(req, res, next){
    //If user is signed in, then pass the request
    //to next function( controller's action )
    if( req.isAuthenticated()){
        return next();
    }
    //If the user is not signed in
    return res.redirect('/users/sign-in');
}

//Once user is sign-in
passport.setAuthenticatedUser = function(req,res,next){
    if( req.isAuthenticated()){
        //req.user contains the current signed in user from the session 
        //-cookie and we are just sending this to locals for the view
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
