
var express = require("express");
var Spotify = require('node-spotify-api');
var path = require("path");
var cors = require("cors");

//middleware
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//server
var PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
console.log("listening on " + PORT);
});

//initial frontend HTML
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.post("/api", function (req, res) {
  const artistName = req.body.artistName;
  const album = req.body.album;
  console.log(artistName);
  console.log(album);

  var spotify = new Spotify({
    id: '3b6b2f5b8750435aa00914af973df039',
    secret: 'c4115860357d47c4a65cfb081f4596e6'
  });

  //search by album
  spotify.search({
    type: 'album',
    query: album

  }).then(data => {
   let albumData;
    //matching album with the name of artist // and artwork
    for (var i = 0; i < data.albums.items.length; i++) {
      if (data.albums.items[i].artists[0].name == artistName) {

        id = data.albums.items[i].id;
        albumData =  data.albums.items[i];
        res.status(200);
        res.json(albumData)

      }
    }
  });
});