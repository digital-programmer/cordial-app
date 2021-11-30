const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require("../mailers/comments_mailer");
const commentEmailWorker = require("../workers/comment_email_worker");
const queue = require("../config/kue");


module.exports.createComment = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            comment = await Comment.populate(comment, { path: 'user', select: '-password' });
            // commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function (err) {
                if (err) {
                    console.log("Error in creating queue");
                    return;
                }
            });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment
                    },
                    message: "Comment created!"
                });
            } else {
                req.flash('success', 'Comment published!');
                return res.redirect('/');
            }



        }
    } catch (err) {
        console.log("Error", err);
        return res.redirect('/');
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {

            let post_id = comment.post;
            comment.remove();

            let post = Post.findByIdAndUpdate(post_id, { $pull: { comments: req.params.id } });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id,
                    },
                    message: 'Comment deleted!'
                })
            }
            return res.redirect('back');

        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }
}