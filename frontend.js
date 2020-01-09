var form = document.getElementById("form");
form.addEventListener("submit", function(e){
    e.preventDefault();
  
    var artistName = document.getElementById("artName").value;
    var album = document.getElementById("album").value;

    var data = {
        artistName: artistName,
        album: album
    }

    $.ajax("/", {
        type: "POST",
        data: data
    }).then((response) => {
        console.log(typeof response)
//loop through the response and create variables for all the info you need here

        // Reload the page to get the updated list
        location.reload()
    })


});





