var path = require("path");

module.exports = function(app) {

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.get("/rank", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/rank.html"));
});

  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });

  app.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/aboutus.html"));
  });

};
