const User = require('../models/user');
const user = require('../models/user');
const fs = require('fs');
const path = require('path');
const { profile } = require('./admin_controller');

//keep it same ie dont add async await
module.exports.profile = function(req,res){

    User.findById(req.params.id, function(err,user){
        return res.render('users_profile', {
            title : "User Profile",
            profile_user : user
        });
    });
   
    //res.end('<h1>User Profile</h1>');
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         req.flash('success', 'Updated!');
    //         return res.redirect('back');
    //     })
    //}
    //Converting to async/await as added file
    //upload part that makes it complecated
    if( req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            //Things inside form can not be accesed directly with
            //req.params because this is now multipart-form-data
            //so our parser would not able to parse it. For that
            //multer has deployed 2 tasks as multer processes req also.
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('Multer Error', err)}
                //console.log(req.file);
                //Without multer we could not read body 
                //beacuse form is multipart
                //Updating(here didnt used findByIdAndUpdate function)
                user.name = req.body.name;
                user.email = req.body.email;
                //If req contains a file
                if(req.file){
                    //Check if user already has an avatar associated 
                    //with him. If yes then remove & add new one
                    if(user.avatar){
                        //Delete avatar for which we need fs & path module
                        //Current path unlink ho jaega
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    //This is saving path of uploaded 
                    //file into avatar fiels of user
                    user.avatar = User.avatarPath + '/' + req.file.filename;   
                }
                user.save();
                return res.redirect('back');
            });
        }catch{
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        //If user doesn't match
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

// module.exports.posts = function(req,res){
//     res.end('<h1>These are Users Post...!!</h1>');
// }

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
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    user.findOne({
        email : req.body.email
    },function(err,user){
        if(err){
           //console.log('Error in finding user in signup'); 
           req.flash('error', err);
           return;
        }
        if(!user){
            //If user not found create user
            User.create(req.body, function(err,user){
                if(err){
                   // console.log('error in creating user while sign up');
                    req.flash('error', err);
                    return;
                }
                //Means user created now redirected to sign in
                return res.redirect('/users/sign-in');
            })
        }
        else{
            //If user already exists we're redirect back to sign up page
            req.flash('success', 'You have signed up, login to continue!');

            return res.redirect('back');
        }
    })
}

//Get the signin data
module.exports.createSession = function(req,res){
    //Todo later
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    // Function given by passportjs to req
    req.logout(); 
    req.flash('success', 'You Have Logged Out');
    return res.redirect('/');
}
