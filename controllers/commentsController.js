const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.createComment = function (req, res) {
    Post.findById(req.body.post, function (err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                // handle error
                if (err) {
                    console.log("Couldn't comment on this post");
                    return res.redirect('/')
                }

                post.comments.push(comment);
                post.save();

                res.redirect("/");
            })
        }
    });
}

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id, (err, comment) => {
        if (comment.user == req.user.id) {
            let post_id = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(post_id, { $pull: { comments: req.params.id } }, function (err, post) {
                return res.redirect('back');
            });
        } else {
            return res.redirect('back');
        }
    });
}