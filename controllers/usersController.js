module.exports.profile = function (req, res) {
  res.render("user_profile", {
    title: "Profile",
  });
};

module.exports.timeline = function (req, res) {
  res.end("<h1>User Timeline</h1>");
};
