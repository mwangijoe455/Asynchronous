// API URL
let API_URL = "https://jsonplaceholder.typicode.com/posts";

// Get HTML elements
let postContainer = document.getElementById("postContainer");
let loadBtn = document.getElementById("loadBtn");

// Fetch posts from the API
async function fetchPosts() {

    try {

        // Display a loading message
        postContainer.innerHTML = "<p>Loading posts...</p>";

        // Request posts from the API
        let response = await fetch(API_URL);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to load posts.");
        }

        // Convert the response into JavaScript objects
        let posts = await response.json();

        // Display the posts
        displayPosts(posts);

    } catch (error) {

        // Display an error message if something goes wrong
        postContainer.innerHTML = `<p>${error.message}</p>`;
    }
}

// Display five random posts
function displayPosts(posts) {

    // Clear old posts
    postContainer.innerHTML = "";

    // Get five random posts
    let randomPosts = getRandomPosts(posts, 5);

    // Display each post
    for (let i = 0; i < randomPosts.length; i++) {

        let post = randomPosts[i];

        let div = document.createElement("div");

        // Create the title
        let title = document.createElement("h3");
        title.textContent = capitalize(post.title);

        // Create the body
        let body = document.createElement("p");
        body.textContent = capitalize(post.body);

        // Display the user ID
        let user = document.createElement("p");
        user.textContent = `User ${post.userId}`;

        // Display the post ID
        let id = document.createElement("p");
        id.textContent = `Post #${post.id}`;

        // Add elements to the post
        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(user);
        div.appendChild(id);

        // Add the post to the page
        postContainer.appendChild(div);

        // Add a line between posts
        if (i < randomPosts.length - 1) {
            postContainer.appendChild(document.createElement("hr"));
        }
    }

    // Display the number of posts shown
    let stats = document.createElement("p");
    stats.textContent = `Showing ${randomPosts.length} posts out of ${posts.length}`;

    postContainer.appendChild(stats);
}

// Select random posts
function getRandomPosts(posts, count) {

    // Create a copy of the array
    let shuffled = [...posts];

    // Shuffle the array
    for (let i = shuffled.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        let temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }

    // Return the required number of posts
    return shuffled.slice(0, count);
}

// Capitalize the first letter of a string
function capitalize(text) {

    // Return an empty string if there is no text
    if (!text) {
        return "";
    }

    // Convert the first letter to uppercase
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Load posts when the button is clicked
loadBtn.addEventListener("click", fetchPosts);

// Automatically load posts when the page opens
document.addEventListener("DOMContentLoaded", function () {
    fetchPosts();
});