module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Cordial",
  });
};

module.exports.about = function (req, res) {
  return res.end("<h1>About Page</h1>");
};
