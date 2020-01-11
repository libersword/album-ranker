$(document).ready(function() {
  //API
  var imgSrc;
  var artSearch = $("#spotify-api");
  $(artSearch).on("click", handleButtonSubmit);
  function handleButtonSubmit(event) {
    event.preventDefault();
      console.log("working!!!!!!")
      var artistName = document.getElementById("artist").value;
      var album = document.getElementById("album").value;

      var data2 = {
          artistName: artistName,
          album: album
      }
      console.log(data2);

      $.ajax("/api", {
          type: "POST",
          data: data2
      }).then((response) => {
          console.log(response)
          //setting image source
          $("#img").attr("src", response.images[0].url);

          $("#albumName").text(response.name);
          $("#albumYear").text(response.release_date);
          $("#numTracks").text(response.total_tracks);
          imgSrc = response.images[0].url;
      })
    }
    

  //ALGORITHM
  var artistInput = $("#artist");
  var albumInput = $("#album");
  var albumSubmit = $("#albumSubmit");
  var overallRating = $("#overall");
  var dynamicRating = $("#dynamicRating");
  var uniqueRating = $("#uniqueRating");
  var productionRating = $("#productionRating");
  var musicianshipRating = $("#musicianshipRating");
  var dI = $("#dynamic");
  var uI = $("#unique");
  var pI = $("#production");
  var mI = $("#musicianship");
  var notes = $("#notes");
  var updating = false;
  var albumContainer = $(".album-container");
  var albumList = $('tbody');
  $(albumSubmit).on("submit", handleFormSubmit);

  $(document).on("click", ".delete-album", handleDeleteButton);
  $(document).on("click", ".edit-album", handleAlbumEdit);
  
  function getAlbums(){
    $.get('/api/albums', function(data){
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++){
        rowsToAdd.push(createAlbumRow(data[i]));
      }
      renderAlbumList(rowsToAdd);
    })
  }
  

  function renderAlbumList(rows){
    if(rows.length){
      // console.log(rows);
      albumList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }


  function createAlbumRow(albumData){
    var newA = $('<tr>');
    newA.data("album", albumData);
    newA.append("<td><img src =" + albumData.albumArt + " width=150 height=150 /></td>");
    newA.append("<td>" + albumData.artistName);
    newA.append("<td>" + albumData.albumName);
    newA.append("<td>" + albumData.overallRating);
    newA.append("<td>" + albumData.totalScore);
    newA.append("<td>" + albumData.notes);
    newA.append("<td><button style='cursor:pointer;color:red;width:30px; height:12px; margin-left:10px;' class='delete-album'><i class='fa fa-trash-o' aria-hidden='true'></i></button>");
    // + ' ' + "<button style='cursor:pointer;color:red;width:30px; height:12px; margin-left:10px;' class='edit-album'><i class='fa fa-pencil' aria-hidden='true'></i></button></td>"
  return newA;
  }

  function renderEmpty(){
    var createAlbum = $("<a href=/rank>");
    createAlbum.text("Add an Album");
    albumContainer.append(createAlbum);
  }

  function handleDeleteButton(){
    var listItemData = $(this).parent("td").parent("tr").data("album");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/albums/" + id
    }).then(getAlbums);
    window.location.href="/profile";
  }
  
  function handleAlbumEdit() {
    var currentAlbum = $(this)
      .parent()
      .parent()
      .data("album");
    window.location.href = "/rank?id=" + currentAlbum.id;
  }

  var url = window.location.search;
  var albumId;
  
  if (url.indexOf("?id=") !== -1) {
    albumId = url.split("=")[1];
    getAlbumData(albumId);
  }
  else {
    getAlbums();
  }
  

  function getAlbumData(id) {
    var queryUrl;
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.albumId || data.id);
        albumId = data.albumId || data.id;
        updating = true;
      }
    });
  }


  function handleFormSubmit(event) {
    event.preventDefault();
    let artist = artistInput.val().trim();
    let album = albumInput.val().trim();
    let albumArt = imgSrc;
    let overall = overallRating.val();
    let dynamics = dynamicRating.val();
    let unique = uniqueRating.val();
    let production = productionRating.val();
    let musicianship = musicianshipRating.val();
    let dImportance = dI.val();
    let uImportance = uI.val();
    let pImportance = pI.val();
    let mImportance = mI.val();
    let albumNotes = notes.val();
    let totalScore = 0;

    const metaRankingsGiven = [dynamics, unique, production, musicianship];
    const importance = [dImportance, pImportance, uImportance, mImportance];

    const individualRanking = [];

    for (let i = 0; i < metaRankingsGiven.length; i++) {
      let metaRank = 0;
      switch (importance[i]) {
        case "most":
          metaRank = 4.2;
          break;
        case "very":
          metaRank = 3.8;
          break;
        case "somewhat":
          metaRank = 3.2;
          break;
        case "least":
          metaRank = 2.8;
          break;
      }
      totalOverall = overall;
      const totalCatScore = metaRankingsGiven[i] * metaRank;
      // console.log(totalCatScore);
      totalScore += parseInt(totalCatScore);
      individualRanking.push(totalCatScore);
    }
    totalScore += parseInt(totalOverall);


    var newAlbum = {
      artistName: artist,
      albumName: album,
      albumArt: albumArt,
      overallRating: totalOverall,
      dynamicRating: dynamics,
      uniqueRating: unique,
      productionRating: production,
      musicianshipRating: musicianship,
      dynamic: individualRanking[0],
      unique: individualRanking[1],
      production: individualRanking[2],
      musicianship: individualRanking[3],
      totalScore: totalScore,
      notes: albumNotes
    };

    if (updating) {
      newAlbum.id = albumId;
      updateAlbum(newAlbum);
    }
    else {
      submitAlbum(newAlbum);
    }
  

    function submitAlbum(album) {
      $.post("/api/albums", album, function() {
        // console.log("added album");
        // console.log(album);
        window.location.href = "/profile";
      }).then(getAlbums);
    }

    function updateAlbum(album) {
      $.ajax({
        method: "PUT",
        url: "/api/albums",
        data: album
      })
        .then(function() {
          window.location.href = "/profile";
        });
    }
  }
})


