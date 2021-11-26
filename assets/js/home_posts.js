{
    // method to submmitform data from form using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {

                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    showSuccessMessage("Post published!")
                },
                error: function (err) {
                    showErrorMessage("Oops! Unable to post..");
                    console.log(err.responseText);
                }
            });
            $('#new-post-form textarea').val('');
        });
    }

    // method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li class="post" id="post-${post._id}"><p><small><a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>&nbsp;</small>${post.content}<br><small>${post.user.name}</small></p><div class="post-comments"><form action="/comments/create" method="post" id="post-${post._id}-comments-form"><input type="text" name="content" placeholder="Type here to add comment..." required><input type="hidden" name="post" value="${post._id}"><input type="submit" value="Add Comment"></form><div class="post-comments-list"><h3>Comments</h3><ul id="post-comments-${post._id}"></ul></div></div></li>`);
    }

    // method to delete a post in DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    showSuccessMessage("Post deleted!")
                },
                error: function (err) {
                    showErrorMessage("Oops! Unable to delete");
                    console.log(err.responseText);
                }
            })
        })
    }


    function addDeleteEventonload() {
        $('#posts-list-container>ul>li').each(function () {
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }


    function showSuccessMessage(message) {
        new Noty({
            theme: 'relax',
            text: message,
            type: 'success',
            layout: 'topRight',
            timeout: 1500
        }).show();
    }

    function showErrorMessage(message) {
        new Noty({
            theme: 'relax',
            text: message,
            type: 'error',
            layout: 'topRight',
            timeout: 1500
        }).show();
    }

    addDeleteEventonload();
    createPost();


}