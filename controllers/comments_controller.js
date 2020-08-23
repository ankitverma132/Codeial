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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if( comment.user == req.user.id ){
            //Before deleting comment we need to fetch comment
            //id so that we can go into comment in comments
            //array of post
            //Save post id and comment id as we will need that
            let postId = comment.post;
            comment.remove();
            //In post schema
            //pull the comment from comments array using mongodb syntax
            Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}}, function(err,post){
                return res.redirect('back');   
            })
        }else{
            //Comment doesn't find
            return res.redirect('back');
        }
    })
}