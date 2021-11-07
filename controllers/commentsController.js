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