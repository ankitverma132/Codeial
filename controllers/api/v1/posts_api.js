const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

//Rendering post list using apis
module.exports.index = async function(req,res){

        //Using async/await
    let posts = await Post.find({})
        .sort('-createdAt')
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
    return res.json(200, {
        message : "List of posts",
        posts : posts
    })
}

module.exports.destroy = async function(req,res){
    try{
       
    let post = await Post.findById(req.params.id);    
        post.remove();
            //Deleteing from comment collection
        await Comment.deleteMany({post : req.params.id});
        return res.json(200,{
            message : "Post and associated comments deleted succesfully"
        });
    }
    catch(err){
        console.log('****Error');
        return res.json(500, {
            message : "Internal server error"
        });
    }
}   