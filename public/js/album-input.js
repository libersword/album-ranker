  // Jquery References to input
  var artistInput = $("#artistName");
  var albumInput = $("#albumName");
  var albumForm = $("#albumSubmit");
  var overallRating = $("#overall");
  var dynamicRating = $("#dynamicRating");
  var uniqueRating = $("#uniqueRating");
  var productionRating = $("#productionRating");
  var musicianshipRating = $("#musicianshipRating");
  var dI = $("#dynamic");
  var uI = $("#unique");
  var pI = $("#production");
  var mI = $("#musicianship");

  $(albumSubmit).on("submit", handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!artistInput.val().trim() || !albumName.val().trim() || !overallRating.val() || !dynamicRating.val() || !uniqueRating.val() || !productionRating.val() || !dynamics.val()|| !overall.val()|| !production.val()|| !musicianship.val()) {
      return;
    }

      let dynamics = dynamicRating.val();
      let unique = uniqueRating.val();
      let production = productionRating.val();
      let musicianship = musicianshipRating.val();

      const metaRankingsGiven = [dynamics, unique, production, musicianship];

      const rankingCategories = ['dynamics', 'uniqueness', 'production', 'musicianship'];

      const importance = [dI, pI, uI, mI];

      const individualRanking = [];

      let overallRating = 0;

      for (let i = 0; i < rankingCategories.length; i++){
        let metaRank = 0;
        let totalScore = 0;
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
        overallRating = overallRating.val() * 2;
        const totalCatScore = metaRankingsGiven[i] * metaRank + overallRating;
        totalScore += totalCatScore;
        console.log(rankingCategories[i] + ' ' + totalCatScore);
        individualRanking.push(metaRank);
      }  

    var newAlbum = {
      artistName: artistInput
        .val()
        .trim(),
      albumName: albumInput
        .val()
        .trim(),
      overallRating: overallRating.val(),
      dynamicRating: dynamicRating.val(),
      uniqueRating: uniqueRating.val(),
      productionRating: productionRating.val(),
      musicianshipRating: musicianshipRating.val(),
      dynamic: individualRanking[0],
      unique: individualRanking[1],
      production: individualRanking[2],
      musicianship: individualRanking[3],
    };
    submitAlbum(newAlbum);
  }

  function submitAlbum(album) {
    $.post("/api/albums", album, function() {
      window.location.href = "/albums";
    });
  }