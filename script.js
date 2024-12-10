// Spotify API credentials (placeholder - replace with actual implementation)
const CLIENT_ID = "your_spotify_client_id";
const CLIENT_SECRET = "your_spotify_client_secret";
let accessToken;

// Get Spotify Access Token
async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    accessToken = data.access_token;
}

// Search Spotify API
async function searchSpotify(query) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track,artist,album`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    displayResults(data.tracks.items);
}

// Display Search Results
function displayResults(tracks) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    tracks.forEach(track => {
        const card = document.createElement('div');
        card.classList.add('result-card');

        card.innerHTML = `
            <img src="${track.album.images[0].url}" alt="${track.name}">
            <h3>${track.name}</h3>
            <p>Artist: ${track.artists[0].name}</p>
            <p>Album: ${track.album.name}</p>
            <p>Release Year: ${track.album.release_date.split('-')[0]}</p>
        `;
        
        resultsContainer.appendChild(card);
    });
}

// Random Recommendations
function recommendRandomMood() {
    const moods = ['Happy', 'Relaxed', 'Energetic', 'Sad'];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    alert(`Here’s a playlist for your mood: ${randomMood}`);
}

// Event Listeners
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        searchSpotify(query);
    }
});

document.getElementById('recommend-button').addEventListener('click', recommendRandomMood);

// Initialize App
getAccessToken();
