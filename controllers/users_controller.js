module.exports.profile = function(req,res){

    return res.render('users_profile', {
        title : "Profile"
    })

    //res.end('<h1>User Profile</h1>');
}

module.exports.posts = function(req,res){
    res.end('<h1>These are Users Post...!!</h1>');
}