
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
})
















        // console.log("data.albums.items[i]", data.albums.items[i]);
        // console.log("Album Name: ", data.albums.items[i].name);
        // console.log("Artist Name: ", data.albums.items[i].artists[0].name);
        // console.log("Artwork: ", data.albums.items[i].images[0].url);
        // console.log("Album ID: ", data.albums.items[i].id);
        // console.log("Number of tracks ", data.albums.items[i].total_tracks);
        // console.log("Album Year: ", data.albums.items[i].release_date);

  // spotify.request("https://api.spotify.com/v1/albums/" + id + "/tracks")
    //   .then(function (data) {
    //     let filteredData = data.map(items => {
    //       // only get data you need here. 
    //      })

    //     // narrow down data response with only data needed for the front end
    //     albumData.tracks = filteredData // this is an array of narrowed down data from the response

    //     res.status(200);
    //     res.json(albumData)


    //   })
    //   .catch(function (err) {
    //     console.error('Error occurred: ' + err);
    //   });