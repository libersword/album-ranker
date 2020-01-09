  // Jquery References to input
  var artistInput = $("#artistName");
  var albumInput = $("#albumName");
  var albumForm = $("#albumSubmit");
  var overallRating = $("#overall");
  var dynamicRating = $("#dynamicRating");
  var uniqueRating = $("#uniqueRating");
  var productionRating = $("#productionRating");
  var musicianshipRating = $("#musicianshipRating");
  var dynamic = $("#dynamic");
  var unique = $("#unique");
  var production = $("#production");
  var musicianship = $("#musicianship");

  $(albumSubmit).on("submit", handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!artistInput.val().trim() || !albumName.val().trim() || !overallRating.val() || !dynamicRating.val() || !uniqueRating.val() || !productionRating.val() || !dynamics.val()|| !overall.val()|| !production.val()|| !musicianship.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      AuthorId: authorSelect.val()
    };
  }