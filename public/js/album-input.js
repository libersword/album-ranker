$(document).ready(function() {

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
    $(albumSubmit).on("submit", handleFormSubmit);


    function handleFormSubmit(event) {
      event.preventDefault();
  
      let artist = artistInput.val().trim();
      let album = albumInput.val().trim();
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

      console.log(artist.toLowerCase(), album.toLowerCase(), overall, dynamics, unique, production, musicianship, dImportance, uImportance, pImportance, mImportance, albumNotes);
    
      const metaRankingsGiven = [dynamics, unique, production, musicianship];
  
        const importance = [dImportance, pImportance, uImportance, mImportance];
  
        const individualRanking = [];
        
        for (let i = 0; i < metaRankingsGiven.length; i++){
          let metaRank = 0;
          switch(importance[i]){
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
          console.log(totalCatScore);
          totalScore += parseInt(totalCatScore+totalOverall);
          individualRanking.push(totalCatScore);
        }
        
        console.log(totalScore);

   var newAlbum = {
      artistName: artist.replace(/\s+/g, '-').toLowerCase(),
      albumName: album.replace(/\s+/g, '-').toLowerCase(),
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
      notes: albumNotes,
    };
    console.log(newAlbum)
    submitAlbum(newAlbum);

  function submitAlbum(album) {
    $.post("/api/albums", album, function() {
      console.log("added album");
      window.location.href = "/album";
    });
  }
  }
});
