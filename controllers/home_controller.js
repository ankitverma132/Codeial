const Post = require('../models/post');
const User = require('../models/user');
const { populate } = require('../models/post');
//module.export.actionName = function(req,res){};

module.exports.home = async function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({},function(err,posts){
    //     return res.render('home', {
    //         title : "Codeial | Home",
    //         posts : posts
    //     });
    // });
    
    //Populate user of each post
    // Post.find({})
    // .populate('user')
    // //Need to populate multiple models, first 
    // //comments and then user of the comment
    // .populate({
    //     path : 'comments',
    //     //Further populate
    //     populate : {
    //         path : 'user'
    //     }
    // })
    // .exec(function(err,posts){
    //     //Sending all users to show friends
    //     User.find({}, function(err, users){
    //         return res.render('home', {
    //             title : "Codeial | Home",
    //             posts : posts,
    //             all_users : users
    //          });
    //     }); 
    // })

    try{
        //Using async/await
        let posts = await Post.find({})
        .populate('user')
        //Need to populate multiple models, first 
        //comments and then user of the comment
        .populate({
            path : 'comments',
            //Further populate
            populate : {
                path : 'user'
            }
        });
        //Sending all users to show friends
        let users = await User.find({});

        return res.render('home', {
            title : "Codeial | Home",
            posts : posts,
            all_users : users
        });
    }
    catch{
        console.log("Error", err);
    }
    
    //Using then
    //Post.find({}).populate('comments).then(function());

   // return res.end('<h1>Express is up for Codeial!</h1>');
}