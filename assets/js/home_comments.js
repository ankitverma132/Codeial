{
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function(e){
            //We dont want form to be submitted naturally
            e.preventDefault();
            $.ajax({
                type : 'post',
                url : '/comments/create',
                data : newPCommentForm.serialize(),
                success: function(data){
                   // console.log(data);
                    let newComment = newCommentDom(data.data.comment);
                    //console.log(newPost)
                    $('#post-comments-list>ul').prepend(newComment);
                     
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

    let newCommentDom = function(post){
        return $(`<li>
        <p>
            
                <small>
                    <a href="/comments/destroy/${comment.id}">X</a>
                </small>
        
                <%= comment.content %>
                <br>
                <small>
                    <%= comment.user.name %>
                </small>
        </p>
    </li>
    `)
   }
   createComment();
}