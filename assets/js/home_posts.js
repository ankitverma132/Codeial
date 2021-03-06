{
    // console.log("====");
   let createPost = function(){
       let newPostForm = $('#new-post-form');
       newPostForm.submit(function(e){
           //We dont want form to be submitted naturally
           e.preventDefault();
           $.ajax({
               type : 'post',
               url : '/posts/create',
               data : newPostForm.serialize(),
               success: function(data){
                  // console.log(data);
                   let newPost = newPostDom(data.data.post);
                   //console.log(newPost)
                   $('#posts-list-container>ul').prepend(newPost);
                    
                   deletePost($(' .delete-post-button', newPost));
                   new Noty({
                        theme: 'relax',
                        text: 'Post published!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                  }).show();
                
               },error : function(error){
                   console.log(error.responseText);
               }
           });
       });
   }

   //Method to create a post in dom
   let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            <small>
                <a class = "delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
            ${post.content}
            <br>
            <small>
            ${post.user.name}
            </small>
        </p>
        <div class="post-comments">            
                <form action="/comments/create/" method="POST">
                    <input type="text" name="content" placeholder="Type Here To Add Comment.."
                    required>
                    <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="Add Comment">
                </form>
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">  
                </ul>
            </div>
        </div>
    </li>`)
   }


   //Method to delete a post from dom
   //This method will send post id to be deleted 
   let deletePost = function(deleteLink){
       $(deleteLink).click(function(e){
           e.preventDefault();
           $.ajax({
               type : 'get',
               url : $(deleteLink).prop('href'),
               //On success it will receive some data
               success : function(data){
                    $(`#post-${data.data.post_id}`).remove();
               },error : function(error){
                   console.log(error.responseText);
               }
           });
       });
   }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }

     createPost();
     convertPostsToAjax();
}