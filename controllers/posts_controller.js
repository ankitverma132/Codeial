const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content : req.body.content,
            user : req.user._id   
        });
        //Chech here if request is an ajax request
        if(req.xhr){
            return res.status(200).json({
                data : {
                    post : post
                },
                message : 'Post Created'
            });
        }
        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');

        //console.log("Error", err);
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

            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id : req.params.id
                    },
                    message : "Post deleted"
                });
            }
            
            req.flash('success','Post and asssociated comments deleted!');
            return res.redirect('back');
        }else{
            //If user doesn't match
            req.flash('error','You can not delete this post');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error',err);
        //console.log('Error', err);
        return res.redirect('back');
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