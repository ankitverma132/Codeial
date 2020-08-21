const Post = require('../models/post');
const { populate } = require('../models/post');
//module.export.actionName = function(req,res){};

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({},function(err,posts){
    //     return res.render('home', {
    //         title : "Codeial | Home",
    //         posts : posts
    //     });
    // });
    //Populate user of each post
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home', {
                    title : "Codeial | Home",
                    posts : posts
         });
    })

   // return res.end('<h1>Express is up for Codeial!</h1>');
}