const User = require('../models/user')

module.exports.profile = function (req, res) {
  res.render("user_profile", {
    title: "Profile",
  });
};

module.exports.timeline = function (req, res) {
  res.end("<h1>User Timeline</h1>");
};


// render signup page
module.exports.signUp = (req,res) => {

  if(req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_signup", {
    title: "Codial | Sign Up",
  });
}

// render signin page
module.exports.signIn = (req,res) => {

  if(req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

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
  return res.redirect('/');
}

// exit user session
module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect('/');
}