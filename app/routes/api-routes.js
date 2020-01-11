
var db = require("../models");

module.exports = function(app) {

  app.get("/api/albums", function(req, res) {
    var query = {};
    if (req.query.id) {
      query.AlbumId = req.query.id;
    }
    db.Album.findAll({
      where: query
    },{
    order: ['totalScore','DESC'],
  }).then(function(dbAlbum) {
      res.json(dbAlbum);
    });
  });

  app.get("/api/albums/:id", function(req, res) {
    db.Album.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbAlbum) {
      console.log(dbAlbum);
      res.json(dbAlbum);
    });
  });

  app.post("/api/albums", function(req, res) {
    db.Album.create(req.body).then(function(dbAlbum) {
      res.json(dbAlbum);
    });
  });

  app.put("/api/albums", function(req, res) {
    db.Album.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbAlbum) {
      res.json(dbAlbum);
    });
  });


app.delete("/api/albums/:id", function(req, res) {
  db.Album.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbAlbum) {
    res.json(dbAlbum);
  });
});

};