const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailer/comments_mailer');

module.exports.create = async function(req,res){
    //First verify post_id
    //So first find the post with that post_id 
    //& then create the comment on it.
    //We also need to add comment in comments array of post schema

    try{
        let post = await Post.findById(req.body.post);
            //handle error
            if(post){
                //if post found
                let comment = await Comment.create({
                    content : req.body.content,
                    post : req.body.post,
                    user :req.user._id
                    
                });
                //handle error
                //Update comment(add) in Comments array of post
                post.comments.push(comment);
                post.save(); 

                comment = await comment.populate('user', 'name email').execPopulate();
                commentsMailer.newComment(comment);

                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            comment : comment
                        },
                        message : "Post created!"
                    });
                }
                
                req.flash('success', 'Comment published!');
                res.redirect('/');
            } 
    }
    catch(err){
        //console.log("Error", err);
        req.flash('error', err);
        return;
    }
    // Post.findById(req.body.post, function(err,  post){
    //     //handle error
    //     if(post){
    //         //if post found
    //         Comment.create({
    //             content : req.body.content,
    //             post : req.body.post,
    //             user :req.user._id
    //         },function(err, comment){
    //             //handle error
    //             //Update comment(add) in Comments array of post
    //             post.comments.push(comment);
    //             post.save(); 
    //             res.redirect('/');
    //         });
    //     }
    // });
}

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
            if( comment.user == req.user.id ){
                //Before deleting comment we need to fetch comment
                //id so that we can go into comments array of post
                //Save post id and comment id as we will need that
                let postId = comment.post;
                comment.remove();
                //In post schema
                //pull the comment from comments array using mongodb syntax
                let post = Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}});

                // send the comment id which was deleted back to the views
                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }

                req.flash('success', 'Comment deleted!');
                return res.redirect('back');   
            }else{
                //Comment doesn't find
                req.flash('error', 'Unauthorized');
                return res.redirect('back');
            }
    }
    catch(err){
        //console.log("Error",err);
        req.flash('error', err);
        return;
    }
    // Comment.findById(req.params.id, function(err,comment){
    //     if( comment.user == req.user.id ){
    //         //Before deleting comment we need to fetch comment
    //         //id so that we can go into comments array of post
    //         //Save post id and comment id as we will need that
    //         let postId = comment.post;
    //         comment.remove();
    //         //In post schema
    //         //pull the comment from comments array using mongodb syntax
    //         Post.findByIdAndUpdate(postId, {$pull : {comments : req.params.id}}, function(err,post){
    //             return res.redirect('back');   
    //         })
    //     }else{
    //         //Comment doesn't find
    //          return res.redirect('back');
    //     }
    // })
}