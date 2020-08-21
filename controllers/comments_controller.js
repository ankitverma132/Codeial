const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    //First verify post_id
    //So first find the post with that post_id 
    //& then create the comment on it.
    //We also need to add comment in comments array of post schema

    Post.findById(req.body.post, function(err,  post){
        //handle error
        if(post){
            //if post found
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user :req.user._id
            },function(err, comment){
                //handle error
                //Update comment(add) in Comments array of post
                post.comments.push(comment);
                post.save(); 
                res.redirect('/');
            });
        }
    });
}