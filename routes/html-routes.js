var path = require("path");

module.exports = function(app) {


  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/album", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/album.html"));
  });

};
