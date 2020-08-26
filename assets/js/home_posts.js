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
                   //console.log(data);
                   let newPost = newPostDom(data.data.post);
                   $('#post-list-container>ul').prepend(newPost);
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
                <a class = "delete-post-button" href="/posts/destroy/${post.id}">X</a>
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

     createPost();
}