const songs = [
    {
        id: 1,
        title: "Sunset Vibes",
        artist: "Chill Hopper",
        album: "Summer 2024",
        img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        color: "#fbbf24" // Amber
    },
    {
        id: 2,
        title: "Urban Dreams",
        artist: "City Lights",
        album: "Night Life",
        img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        color: "#2563eb" // Blue
    },
    {
        id: 3,
        title: "Deep Focus",
        artist: "Mindful Beats",
        album: "Work Flow",
        img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        color: "#059669" // Emerald
    },
    {
        id: 4,
        title: "Electric Pulse",
        artist: "Neon Wave",
        album: "Retro Future",
        img: "https://images.unsplash.com/photo-1514525253440-b393335a898c?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        color: "#7c3aed" // Violet
    },
    {
        id: 5,
        title: "Morning Coffee",
        artist: "Acoustic Soul",
        album: "Sunrise",
        img: "https://images.unsplash.com/photo-1459749411177-8c29142af460?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        color: "#d97706" // Orange
    },
    {
        id: 6,
        title: "Driving Home",
        artist: "The Travelers",
        album: "Road Trip",
        img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        color: "#4b5563" // Gray
    },
    {
        id: 7,
        title: "Midnight City",
        artist: "Neon Echo",
        album: "Synthesize",
        img: "https://images.unsplash.com/photo-1557683316-973673baf926?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        color: "#9333ea" // Purple
    },
    {
        id: 8,
        title: "Ocean Breeze",
        artist: "Calm Waters",
        album: "Nature Speaks",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        color: "#0891b2" // Cyan
    },
    {
        id: 9,
        title: "Forest Rain",
        artist: "Earthly Tones",
        album: "Deep Woods",
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        color: "#166534" // Green
    },
    {
        id: 10,
        title: "Golden Hour",
        artist: "Amber Skies",
        album: "Horizon",
        img: "https://images.unsplash.com/photo-1470252649358-96947c050e82?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        color: "#eab308" // Yellow
    }
];


const greetingGrid = document.getElementById('greeting-grid');
const recentCards = document.getElementById('recent-cards');
const madeForYouCards = document.getElementById('made-for-you-cards');
const libraryContent = document.getElementById('library-content');

// Player Elements
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.querySelector('.specific-prev');
const nextBtn = document.querySelector('.specific-next');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currTimeEl = document.getElementById('curr-time');
const totTimeEl = document.getElementById('tot-time');
const volumeSlider = document.querySelector('.volume-slider-container');
const volumeBar = document.querySelector('.volume-slider');
const nowPlayingImg = document.getElementById('now-playing-img');
const nowPlayingTitle = document.getElementById('now-playing-title');
const nowPlayingArtist = document.getElementById('now-playing-artist');
const likeBtn = document.querySelector('.like-btn');
const searchInput = document.getElementById('search-input');
const addPlaylistBtn = document.getElementById('add-playlist-btn');
const userAvatar = document.getElementById('user-avatar');
const userDropdown = document.getElementById('user-dropdown');
const loginLogoutBtn = document.getElementById('login-logout-btn');

const navHome = document.getElementById('nav-home');
const navSearch = document.getElementById('nav-search');
const homeView = document.getElementById('home-view');
const searchView = document.getElementById('search-view');
const mainContent = document.querySelector('.main-content');
const categoryGrid = document.getElementById('category-grid');

const shuffleBtn = document.querySelector('.shuffle');
const repeatBtn = document.querySelector('.repeat');

let isShuffle = false;
let isRepeat = false;
let isPlaying = false;
let currentSongIndex = 0;
let audio = new Audio();
let isLoggedIn = true;


// Like toggle
if (likeBtn) {
    likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('liked');
        if (likeBtn.classList.contains('liked')) {
            likeBtn.classList.replace('fa-regular', 'fa-solid');
        } else {
            likeBtn.classList.replace('fa-solid', 'fa-regular');
        }
    });
}

// Search Filter
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = songs.filter(s =>
            s.title.toLowerCase().includes(query) ||
            s.artist.toLowerCase().includes(query)
        );
        renderFilteredCards(filtered);
    });
}

// Add Playlist functionality
if (addPlaylistBtn) {
    addPlaylistBtn.addEventListener('click', () => {
        const playlistName = `My Playlist #${Math.floor(Math.random() * 1000)}`;
        const newItem = document.createElement('div');
        newItem.className = 'library-item';
        newItem.innerHTML = `
            <div class="library-img placeholder-img">
                <i class="fa-solid fa-music"></i>
            </div>
            <div class="library-info">
                <div class="library-name">${playlistName}</div>
                <div class="library-desc">Playlist • 0 songs</div>
            </div>
        `;
        libraryContent.appendChild(newItem);
        console.log(`[Spotify Clone] Created ${playlistName}`);
    });
}

// User Profile / Login functionality
if (userAvatar) {
    userAvatar.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
    });
}

window.addEventListener('click', () => {
    if (userDropdown && userDropdown.classList.contains('show')) {
        userDropdown.classList.remove('show');
    }
});

if (loginLogoutBtn) {
    loginLogoutBtn.addEventListener('click', () => {
        isLoggedIn = !isLoggedIn;
        if (isLoggedIn) {
            loginLogoutBtn.innerText = 'Log out';
            userAvatar.innerText = 'S';
            alert('Logged in as Shaheriyar');
        } else {
            loginLogoutBtn.innerText = 'Log in';
            userAvatar.innerText = '?';
            alert('Logged out');
        }
    });
}

// Additional interactions
const upgradeBtn = document.querySelector('.upgrade-btn');
const installBtn = document.querySelector('.install-btn');

if (upgradeBtn) {
    upgradeBtn.addEventListener('click', () => alert('Welcome to Spotify Premium! Enjoy ad-free music.'));
}
if (installBtn) {
    installBtn.addEventListener('click', () => alert('Spotify Desktop app installation started...'));
}

function renderFilteredCards(filteredSongs) {
    // Update the greeting grid or the recent cards with search results
    const target = querySelectorVisibleSection();
    if (filteredSongs.length === 0) {
        greetingGrid.innerHTML = '<p style="padding: 20px; color: var(--text-secondary);">No results found</p>';
        return;
    }

    greetingGrid.innerHTML = filteredSongs.slice(0, 6).map((song) => {
        const index = songs.findIndex(s => s.id === song.id);
        return `
            <div class="greeting-card" onclick="playSong(${index})">
                <img src="${song.img}" alt="${song.title}">
                <span>${song.title}</span>
                <div class="play-btn-overlay">
                     <i class="fa-solid fa-play"></i>
                </div>
            </div>
        `;
    }).join('');
}

function querySelectorVisibleSection() {
    return greetingGrid; // Simplified for this demo
}



// --- Initialization ---

function init() {
    renderGreeting();
    renderRecent();
    renderMadeForYou();
    renderLibrary();
    renderCategories();
    loadSong(songs[0]);
    setupNavigation();
    setupPlayerExtras();
}

function setupNavigation() {
    navHome.addEventListener('click', () => switchView('home'));
    navSearch.addEventListener('click', () => switchView('search'));
}

function switchView(view) {
    if (view === 'home') {
        homeView.classList.add('active');
        searchView.classList.remove('active');
        navHome.classList.add('active');
        navSearch.classList.remove('active');
    } else {
        homeView.classList.remove('active');
        searchView.classList.add('active');
        navHome.classList.remove('active');
        navSearch.classList.add('active');
    }
}

function renderCategories() {
    const categories = [
        { name: "Podcasts", color: "#e8115b", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&h=200&fit=crop" },
        { name: "Made For You", color: "#1e3264", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=200&fit=crop" },
        { name: "Charts", color: "#8d67ab", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop" },
        { name: "New Releases", color: "#e8115b", img: "https://images.unsplash.com/photo-1514525253440-b393335a898c?w=200&h=200&fit=crop" },
        { name: "Pop", color: "#148a08", img: "https://images.unsplash.com/photo-1520127877030-cfdf3f9f7ba3?w=200&h=200&fit=crop" },
        { name: "Hip-Hop", color: "#ba5d07", img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&h=200&fit=crop" },
        { name: "Rock", color: "#e91429", img: "https://images.unsplash.com/photo-1459749411177-8c29142af460?w=200&h=200&fit=crop" },
        { name: "Dance/Electronic", color: "#d84000", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop" }
    ];

    categoryGrid.innerHTML = categories.map(cat => `
        <div class="category-card" style="background-color: ${cat.color}">
            <h3>${cat.name}</h3>
            <img src="${cat.img}" alt="${cat.name}">
        </div>
    `).join('');
}

function setupPlayerExtras() {
    shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
    });
    repeatBtn.addEventListener('click', () => {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active', isRepeat);
    });
}


function renderGreeting() {
    const hour = new Date().getHours();
    let message = "Good morning";
    if (hour >= 12 && hour < 17) message = "Good afternoon";
    else if (hour >= 17) message = "Good evening";

    const greetingHeading = document.querySelector('.section-greeting h2');
    if (greetingHeading) greetingHeading.innerText = message;

    // Show first 6 songs as greeting cards
    greetingGrid.innerHTML = songs.slice(0, 6).map((song, index) => `
        <div class="greeting-card" onclick="playSong(${index})">
            <img src="${song.img}" alt="${song.title}">
            <span>${song.title}</span>
            <div class="play-btn-overlay">
                 <i class="fa-solid fa-play"></i>
            </div>
        </div>
    `).join('');
}

function renderRecent() {
    // Loop through songs for cards
    recentCards.innerHTML = songs.map((song, index) => createCard(song, index)).join('');
}

function renderMadeForYou() {
    // Just reverse or shuffle for variety
    const shuffled = [...songs].reverse();
    madeForYouCards.innerHTML = shuffled.map((song, index) => createCard(song, songs.length - 1 - index)).join('');
}

function createCard(song, index) {
    return `
        <div class="music-card" onclick="playSong(${index})">
            <div class="card-img-wrapper">
                <img src="${song.img}" alt="${song.title}">
                <div class="card-play-btn">
                    <i class="fa-solid fa-play"></i>
                </div>
            </div>
            <div class="card-text">
                <div class="card-title">${song.title}</div>
                <div class="card-desc">${song.artist}</div>
            </div>
        </div>
    `;
}

function renderLibrary() {
    // Add some dummy playlists
    const playlists = [
        { name: "My Playlist #1", type: "Playlist" },
        { name: "Top Hits 2024", type: "Playlist" },
        { name: "Coding Focus", type: "Playlist" }
    ];

    // Existing hardcoded + dynamic
    const existing = libraryContent.innerHTML;
    const newItems = playlists.map(pl => `
        <div class="library-item">
            <div class="library-img placeholder-img">
                <i class="fa-solid fa-music"></i>
            </div>
            <div class="library-info">
                <div class="library-name">${pl.name}</div>
                <div class="library-desc">${pl.type}</div>
            </div>
        </div>
    `).join('');

    libraryContent.innerHTML = existing + newItems;
}


// --- Player Logic ---

function loadSong(song) {
    nowPlayingTitle.innerText = song.title;
    nowPlayingArtist.innerText = song.artist;
    nowPlayingImg.src = song.img;
    audio.src = song.src;

    // Dynamic background effect
    mainContent.style.setProperty('--bg-accent', song.color);
    mainContent.classList.add('dynamic-bg');
}


function playSong(index) {
    if (index !== undefined) {
        if (index === currentSongIndex) {
            if (audio.paused) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        isPlaying = true;
                        updatePlayIcon();
                    }).catch(console.error);
                }
            } else {
                pauseSong();
            }
            return;
        }
        currentSongIndex = index;
        loadSong(songs[currentSongIndex]);
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            isPlaying = true;
            updatePlayIcon();
        }).catch(console.error);
    }
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    updatePlayIcon();
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function updatePlayIcon() {
    if (isPlaying) {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    } else {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
}

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
}

function nextSong() {
    if (isRepeat) {
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                isPlaying = true;
                updatePlayIcon();
            }).catch(console.error);
        }
        return;
    }

    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
    }
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
}


function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (isNaN(duration)) return;

    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Time string
    const durMins = Math.floor(duration / 60);
    const durSecs = Math.floor(duration % 60);
    const curMins = Math.floor(currentTime / 60);
    const curSecs = Math.floor(currentTime % 60);

    totTimeEl.innerText = `${durMins}:${durSecs < 10 ? '0' : ''}${durSecs}`;
    currTimeEl.innerText = `${curMins}:${curSecs < 10 ? '0' : ''}${curSecs}`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    let volume = clickX / width;
    if (volume < 0) volume = 0;
    if (volume > 1) volume = 1;

    audio.volume = volume;
    volumeBar.style.width = `${volume * 100}%`;
}

// Draggable Progress Logic
let isDraggingProgress = false;

progressContainer.addEventListener('mousedown', (e) => {
    isDraggingProgress = true;
    setProgress(e);
});

window.addEventListener('mousemove', (e) => {
    if (isDraggingProgress) {
        const rect = progressContainer.getBoundingClientRect();
        let pos = (e.clientX - rect.left) / rect.width;
        if (pos < 0) pos = 0;
        if (pos > 1) pos = 1;
        audio.currentTime = pos * audio.duration;
    }
});

window.addEventListener('mouseup', () => {
    isDraggingProgress = false;
});



// Event Listeners
playPauseBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong); // Auto play next
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('click', setVolume);

// Init
init();
