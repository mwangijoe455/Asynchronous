// API URL
let API_URL = "https://jsonplaceholder.typicode.com/posts";

// Get HTML elements
let postContainer = document.getElementById("postContainer");
let loadBtn = document.getElementById("loadBtn");

// Fetch posts from the API
async function fetchPosts() {

    try {

        // Show loading message
        postContainer.innerHTML = "<p>Loading posts...</p>";

        // Request data from the API
        let response = await fetch(API_URL);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to load posts.");
        }

        // Convert response to JavaScript objects
        let posts = await response.json();

        // Display the posts
        displayPosts(posts);

    } catch (error) {

        // Show an error message
        postContainer.innerHTML = `<p>${error.message}</p>`;
    }
}

// Display five random posts
function displayPosts(posts) {

    // Clear previous posts
    postContainer.innerHTML = "";

    // Select five random posts
    let randomPosts = getRandomPosts(posts, 5);

    // Display each post
    for (let i = 0; i < randomPosts.length; i++) {

        let post = randomPosts[i];

        let div = document.createElement("div");

        let title = document.createElement("h3");
        title.textContent = capitalize(post.title);

        let body = document.createElement("p");
        body.textContent = capitalize(post.body);

        let user = document.createElement("p");
        user.textContent = `User ${post.userId}`;

        let id = document.createElement("p");
        id.textContent = `Post #${post.id}`;

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(user);
        div.appendChild(id);

        postContainer.appendChild(div);

        if (i < randomPosts.length - 1) {
            postContainer.appendChild(document.createElement("hr"));
        }
    }

    // Display statistics
    let stats = document.createElement("p");
    stats.textContent =
        `Showing ${randomPosts.length} posts out of ${posts.length}`;

    postContainer.appendChild(stats);
}

// Select random posts
function getRandomPosts(posts, count) {

    let shuffled = [...posts];

    for (let i = shuffled.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        let temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }

    return shuffled.slice(0, count);
}

// Capitalize the first letter
function capitalize(text) {

    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Load posts when the button is clicked
loadBtn.addEventListener("click", fetchPosts);

// Load posts when the page opens
document.addEventListener("DOMContentLoaded", function () {
    fetchPosts();
});