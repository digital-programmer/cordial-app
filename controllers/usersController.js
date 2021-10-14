const User = require('../models/user')

// show user profile if signed in
module.exports.profile = function (req, res) {
  // check if user is in cookies
  if(req.cookies.user_id) {
    User.findById(req.cookies.user_id, function(err,user){
      if(user){
        return res.render("user_profile", {
          title: "User Profile",
          user: user,
        });
      }
      return res.redirect("/users/sign-in");
    });
  } else {
    res.redirect("/users/sign-in");
  }
};

// show user timeline
module.exports.timeline = function (req, res) {
  res.end("<h1>User Timeline</h1>");
};


// render signup page
module.exports.signUp = (req,res) => {
  return res.render("user_signup", {
    title: "Codial | Sign Up",
  });
}

// render signin page
module.exports.signIn = (req,res) => {
  return res.render("user_signin", {
    title: "Codial | Sign In",
  });
}

// get the signup data
module.exports.create = function (req, res) {
  if(req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({email: req.body.email}, function(err,user){
    if(err) {
      console.log("Error in finding user in signing up");
      return;
    }

    if(!user) {
      User.create(req.body, function (err,user){
        if(err) {
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
  // steps to authenticate

  // find the user
  User.findOne({email: req.body.email}, function(err,user) {
    if(err) {
      console.log("Error in finding user in signing in");
      return;
    }
  // handle user found
    if(user){
      // handle incorrect password
      if(user.password != req.body.password) {
        return res.redirect("back");
      }
      // handle session creation
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } 
    // handle user nt found
    else {
      return res.redirect("back");
    }

  });





  // if not found
}

// sign-out user
module.exports.signOut = function (req, res) {
  res.clearCookie('user_id');
  return res.redirect("back");
}