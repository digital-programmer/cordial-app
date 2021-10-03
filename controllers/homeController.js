module.exports.home = function (req, res) {
  return res.end("<h1>Exxpress is up for codial</h1>");
};

module.exports.about = function (req, res) {
  return res.end("<h1>About Page</h1>");
};
