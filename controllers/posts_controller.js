const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try{
        await Post.create({
            content : req.body.content,
            user : req.user._id   
        });
        return res.redirect('back');

    }catch(err){
        console.log("Error", err);
    }
   
    // Post.create({
    //     content : req.body.content,
    //     user : req.user._id
    // }, function(err,post){
    //     if(err){
    //         console.log("Error in creating a post");
    //         return;
    //     }
    //     return res.redirect('back');
    // })
}

module.exports.destroy = async function(req,res){
    try{
    //First find if post even exits in db
    let post = await Post.findById(req.params.id);
        //User of post should be same as the user
        //who is requesting to delete post
        //.id means converting object id into string
        if(post.user == req.user.id){
            post.remove();
            //Deleteing from comment collection
            await Comment.deleteMany({
                post : req.params.id
            });
            return res.redirect('back');
        }else{
            //If user doesn't match/=
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Error', err);
        return;
    }

    // //First find if post even exits in db
    // Post.findById(req.params.id, function(err, post){
    //     //User of post should be same as the user
    //     //who is requesting to delete post
    //     //.id means converting object id into string
    //     if(post.user == req.user.id){
    //         post.remove();
    //         //Deleteing from comment collection
    //         Comment.deleteMany({
    //             post : req.params.id
    //         }, function(err){
    //             return res.redirect('back');
    //         });
    //     }else{
    //         //If user doesn't match/=
    //         return res.redirect('back');
    //     }
    // })
}   