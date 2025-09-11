const audioPlayer = document.getElementById('audio-player');
const audioUpload = document.getElementById('audio-upload');
const playlistEl = document.getElementById('playlist');
const searchInput = document.getElementById('search');
const volumeControl = document.getElementById('volume');
const playPauseBtn = document.getElementById('play-pause-btn');
const equalizer = document.getElementById('equalizer');
let tracks = [];
let currentTrackIndex = -1;

// Mock metadata
const mockMetadata = (fileName) => {
    const name = fileName.toLowerCase();
    return {
        title: fileName.split('.')[0],
        artist: name.includes('rock') ? 'Rock Artist' : name.includes('pop') ? 'Pop Artist' : 'Unknown Artist',
        genre: name.includes('rock') ? 'Rock' : name.includes('pop') ? 'Pop' : 'Unknown'
    };
};

// Upload and add tracks
audioUpload.addEventListener('change', (e) => {
    const files = e.target.files;
    for (let file of files) {
        const track = {
            file: file,
            url: URL.createObjectURL(file),
            metadata: mockMetadata(file.name)
        };
        tracks.push(track);
    }
    updatePlaylist();
    if (currentTrackIndex === -1 && tracks.length > 0) {
        playTrack(0);
    }
});

// Update playlist display
function updatePlaylist(filter = '') {
    playlistEl.innerHTML = '';
    tracks.forEach((track, index) => {
        const { title, artist, genre } = track.metadata;
        if (filter &&
            !title.toLowerCase().includes(filter.toLowerCase()) &&
            !artist.toLowerCase().includes(filter.toLowerCase()) &&
            !genre.toLowerCase().includes(filter.toLowerCase())) {
            return;
        }
        const li = document.createElement('li');
        li.textContent = `${title} - ${artist} (${genre})`;
        li.onclick = () => playTrack(index);
        li.draggable = true;
        li.dataset.index = index;
        if (index === currentTrackIndex) {
            li.classList.add('current');
        }
        playlistEl.appendChild(li);
    });
    enableDragAndDrop();
}

// Enable drag-and-drop for playlist reordering
function enableDragAndDrop() {
    const items = playlistEl.querySelectorAll('li');
    items.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.dataset.index);
        });
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        item.addEventListener('drop', (e) => {
            e.preventDefault();
            const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
            const toIndex = parseInt(item.dataset.index);
            if (fromIndex !== toIndex) {
                const [movedTrack] = tracks.splice(fromIndex, 1);
                tracks.splice(toIndex, 0, movedTrack);
                if (currentTrackIndex === fromIndex) {
                    currentTrackIndex = toIndex;
                } else if (fromIndex < currentTrackIndex && toIndex >= currentTrackIndex) {
                    currentTrackIndex--;
                } else if (fromIndex > currentTrackIndex && toIndex <= currentTrackIndex) {
                    currentTrackIndex++;
                }
                updatePlaylist(searchInput.value);
            }
        });
    });
}

// Play a specific track
function playTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    currentTrackIndex = index;
    audioPlayer.src = tracks[index].url;
    audioPlayer.play();
    updateUI();
    updatePlaylist(searchInput.value);
}

// Play or pause
function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    updateUI();
}

// Skip to next or previous
function skipTrack(direction) {
    if (direction === 'next') {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    } else if (direction === 'prev') {
        currentTrackIndex = currentTrackIndex - 1 < 0 ? tracks.length - 1 : currentTrackIndex - 1;
    }
    playTrack(currentTrackIndex);
}

// Volume control
volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value;
});

// Search
searchInput.addEventListener('input', (e) => {
    updatePlaylist(e.target.value);
});

// Save playlist
function savePlaylist() {
    const playlistData = tracks.map(track => ({
        name: track.file ? track.file.name : '',
        metadata: track.metadata
    }));
    localStorage.setItem('playlist', JSON.stringify(playlistData));
    alert('Playlist saved!');
}

// Load playlist
function loadPlaylist() {
    const saved = localStorage.getItem('playlist');
    if (saved) {
        const playlistData = JSON.parse(saved);
        alert('Playlist loaded! Please re-upload the audio files if needed.');
        tracks = playlistData.map(data => ({
            file: null,
            url: null,
            metadata: data.metadata
        }));
        updatePlaylist();
    } else {
        alert('No saved playlist found.');
    }
}

// Toggle dark/light mode
function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

// Update UI based on play state
function updateUI() {
    if (!audioPlayer.paused) {
        playPauseBtn.textContent = '⏸';
        playPauseBtn.classList.add('playing');
        equalizer.classList.add('playing');
    } else {
        playPauseBtn.textContent = '▶️';
        playPauseBtn.classList.remove('playing');
        equalizer.classList.remove('playing');
    }
}

// Auto-play next
audioPlayer.addEventListener('ended', () => {
    skipTrack('next');
});

// Update on play/pause events
audioPlayer.addEventListener('play', updateUI);
audioPlayer.addEventListener('pause', updateUI);