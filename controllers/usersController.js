const User = require('../models/user')
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render("user_profile", {
      title: "Profile",
      profile_user: user
    });
  })


};

module.exports.timeline = function (req, res) {
  res.end("<h1>User Timeline</h1>");
};


// render signup page
module.exports.signUp = (req, res) => {

  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_signup", {
    title: "Codial | Sign Up",
  });
}

// render signin page
module.exports.signIn = (req, res) => {

  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_signin", {
    title: "Codial | Sign In",
  });
}

// get the signup data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in signing up user");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }

  })

}

// create user session
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully');
  return res.redirect('/');
}

// exit user session
module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  return res.redirect('/');
}

// update user profile
module.exports.update = async function (req, res) {

  if (req.user.id == req.params.id) {
    try {

      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, (err) => {
        if (err) {
          console.log("****Multer Error*****", err);
          return res.redirect('back');
        }

        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {

          if (user.avatar) {
            let filepathToBeDeleted = path.join(__dirname, "..", user.avatar);
            fs.unlinkSync(filepathToBeDeleted);
          }

          // saving the path of the uploaded file into the avatar field of user
          user.avatar = User.avatarPath + '/' + req.file.filename;
        }

        user.save();
        return res.redirect('back');
      });


    } catch (err) {
      req.flash('error', err);
      return res.redirect('back');
    }

  } else {
    return res.status(401).send("Unauthorized access");
  }

}