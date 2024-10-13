// Fetch API of comments
const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/comments/";
const websiteCode = "mycomments";

// Function to fetch comments from the server
function fetchComments() {
    console.log('Fetching comments...');

    // Create a URL to retrieve comments for the specified website
    const getCommentsURL = `${baseURL}?website_code=${websiteCode}`;

    // Fetch comments from the server
    fetch(getCommentsURL, {
        method: "GET",
    })
        .then(response => { 
            // Check if the network response is okay; if not, throw an error
            if (!response.ok) {
                throw new Error('Network response was not ok, status: ' + response.status);
            }
            return response.json(); // Convert the response to JSON
        })
        .then(data => {
            // Display received comments on the page
            displayComments(data);
        })
        .catch(error => {
            console.error('Error caught:', error);
        });
}

// Function to display comments on the page
function displayComments(comments) {
    const commentsContainer = document.getElementById("commentsContainer");

    if (commentsContainer) {
        commentsContainer.innerHTML = ""; // Clear the existing comments

        comments.forEach(comment => {
            const para = document.createElement("p");
            // Create a paragraph for each comment with the format: "Username: Comment (Rating)"
            para.textContent = `${comment.username}: ${comment.comment} (${comment.rating ? 'Rating: ' + comment.rating : 'No rating'})`;
            commentsContainer.appendChild(para); // Add the paragraph to the comments container
        });
    } else {
        console.error('Comments container not found on the page.');
    }
}

// Function to post a new comment to the server
function postComment(username, movieName, comment, rating) {
    const postCommentURL = baseURL;
    const postCommentBody = JSON.stringify({
        username,
        movieName,
        comment,
        website_code: websiteCode,
        rating
    });
    console.log(postCommentBody);

    // Send the new comment to the server
    fetch(postCommentURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: postCommentBody
    })
    .then(response => response.json())
    .then(data => {
        fetchComments(); // Refresh the comments after posting
    })
    .catch(error => {
        console.error('Error posting comment:', error);
    });
}

// Listen for the document to be fully loaded, then fetch comments
document.addEventListener('DOMContentLoaded', (event) => {
    fetchComments();
});

// Listen for the "submit" button click and post a new comment
document.getElementById("submit-button").addEventListener("click", function () {
    const selectedMovie = document.getElementById("movie-select").value;
    const commentText = document.getElementById("comment-text").value;
    const selectedRating = document.getElementById("rating-select").value;
    const username = document.getElementById("username").value; 
    // Call the postComment function to send the comment
    postComment(username, selectedMovie, commentText, selectedRating);
});


