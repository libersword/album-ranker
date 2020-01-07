
var express = require("express");
var Spotify = require('node-spotify-api');
const handlebars = require('handlebars');
var path = require("path");
var cors = require("cors");

var artistName;
var album;
var id; // = "4LH4d3cOWNNsVw41Gqt2kv";
var numTracks;

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var PORT = process.env.PORT || 4000;
app.listen(PORT, function(){
    console.log("listening on " + PORT);
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.post("/api", function(req, res){
  console.log("hello");
  //console.log(req.body);
  res.status(200);
  res.json()

  artistName = req.body.artistName;
  album = req.body.album;
  console.log(artistName);
  console.log(album);
  getInfo();
})

function getInfo(){
var spotify = new Spotify({
    id: '3b6b2f5b8750435aa00914af973df039',
    secret: 'c4115860357d47c4a65cfb081f4596e6'
});

  //search by album
  spotify.search({
    type: 'album',
    query: album
  
  }).then(data => {
    //matching album with the name of artist // and artwork
    for (var i = 0; i < data.albums.items.length; i++){
      if(data.albums.items[i].artists[0].name == artistName){
        console.log("data.albums.items[i]", data.albums.items[i]);
        console.log("Album Name: ", data.albums.items[i].name);
        console.log("Artist Name: ", data.albums.items[i].artists[0].name);
        console.log("Artwork: ", data.albums.items[i].images[0].url);
        console.log("Album ID: ", data.albums.items[i].id);
        console.log("Number of tracks ", data.albums.items[i].total_tracks);
        console.log("Album Year: ", data.albums.items[i].release_date);
        id = data.albums.items[i].id;
        numTracks = data.albums.items[i].total_tracks;
      }
    }
    spotify.request("https://api.spotify.com/v1/albums/" + id + "/tracks")
    .then(function(data) {
      console.log(data); 
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });
  
  });

//end getInfo()
}

//search by track

// spotify.search({
//     type: 'track',
//     query: trackName
// }).then(data => {
//     //track object
//     console.log("Track Object:", data.tracks.items[1]);
//     //album name
//     console.log("Album Name:", data.tracks.items[1].album.name);
//     //artist
//     console.log("Artist:", data.tracks.items[1].artists[0].name)
//     //album art?
//     console.log("Album Art:", data.tracks.items[1].album.images[0].url);
// });

