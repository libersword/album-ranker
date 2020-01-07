var form = document.getElementById("form");
form.addEventListener("submit", function(e){
    e.preventDefault();
    console.log("it works!!!!!!");
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
        console.log(`added ${response}`)
        // Reload the page to get the updated list
        location.reload()
    })


});



