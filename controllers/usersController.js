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
  // Later
}

// create user session
module.exports.createSession = function (req, res) {
  // Later
}