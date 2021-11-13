const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  }, (err, post) => {
    if (err) { console.log("Error in creating a post"); return; }
    return res.redirect('back');
  })
};

module.exports.destroy = function (req, res) {
  Post.findById({ _id: req.params.id }, (err, post) => {
    // .id means coverting object ids into string
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, (err) => {
        return res.redirect('back');
      });
    } else {
      return res.redirect('back');
    }


  });
}
