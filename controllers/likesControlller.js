const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.toggleLike = async function (req, res) {
    try {
        // likes/toggle/?id=abshsb&type=Post
        let likable;
        let deleted = false;

        if (req.query.type == 'Post') {
            likable = await Post.findById({ id: req.query.id }).populate('likes');
        } else {
            likable = await Comment.findById({ id: req.query.id }).populate('likes');
        }

        // check if a like already exists
        let existingLike = await Like.findOne({
            likable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        // if exists, delete
        if (existingLike) {
            likable.likes.pull(existingLike._id);
            likable.save();
            existingLike.remove();
            deleted: true
        } else {
            // make a new Like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.Type
            });

            likable.likes.push(newlike._id);
            likable.save();
        }

        return res.json({
            message: "Successfull",
            data: {
                deleted: deleted
            }
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server error" })
    }
}