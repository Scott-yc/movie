$(document).ready(function () {
    // drop menu visibility when a button is clicked
    $("#toggleMenu").click(function () {
        $(".page-links").slideToggle();
    });

    const audioPlayer = document.getElementById('audioPlayer');
    if(audioPlayer){ 
        // Add event listeners to perform custom actions when the user clicks the play button.
        audioPlayer.addEventListener('play', () => {
        });
        audioPlayer.addEventListener('ended', () => {
        });
    }

    document.getElementById("search-button").addEventListener("click", function () {
        console.log("Button clicked"); // Check if the button is clicked
        var searchQuery = document.getElementById("search-input").value;
        console.log("Search query: " + searchQuery); // Check the value of the search query
        alert("You searched for " + searchQuery); // Show an alert box
    });

});


// with the help with AI


