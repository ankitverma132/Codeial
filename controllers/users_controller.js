const User = require('../models/user');
const user = require('../models/user');
const { profile } = require('./admin_controller');

module.exports.profile = function(req,res){

    User.findById(req.params.id, function(err,user){
        return res.render('users_profile', {
            title : "User Profile",
            profile_user : user
        })
    })
   
    //res.end('<h1>User Profile</h1>');
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        })
    }else{
        //If user doesn't match
        return res.status(401).send('Unauthorized');
    }
}


module.exports.posts = function(req,res){
    res.end('<h1>These are Users Post...!!</h1>');
}

//To render sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title : "Codeial | Sign Up"
    })
}

//To render sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title : "Codeial | Sign In"
    })
}

//Get the signup data
module.exports.create = function(req,res){
    //Todo later
    if(req.body.password != req.body.confirm_password){
        
        //We're redirct back to sign up page
        return res.redirect('back');
    }
    user.findOne({
        email : req.body.email
    },function(err,user){
        if(err){
           console.log('Error in finding user in signup'); 
           return;
        }
        if(!user){
            //If user not found create user
            User.create(req.body, function(err,user){
                if(err){
                    console.log('error in creating user while sign up');
                    return;
                }
                //Means user created now redirected to sign in
                return res.redirect('/users/sign-in');
            })
        }
        else{
            //If user already exists we're redirect back to sign up page
            return res.redirect('back');
        }
    })
}

//Get the signin data
module.exports.createSession = function(req,res){
    //Todo later
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    // Function given by passportjs to req
    req.logout(); 
    return res.redirect('/');
}
