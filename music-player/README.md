# Music Player Web Application

## Overview
This project is a web-based music player developed as part of the CodeAlpha internship for the Web Development track. It provides a modern, interactive interface for uploading, playing, and managing audio files with playlist support, built using HTML, CSS, and JavaScript. The application features a sleek UI with animations, a yellow-themed color scheme, and a dark/light mode toggle for enhanced user experience.

## Features
- **Audio Upload**: Upload multiple audio files (e.g., MP3) via a file input for playback.
- **Playlist Management**: Create, save, and load playlists using browser `localStorage`. Supports drag-and-drop reordering of tracks.
- **Playback Controls**: Play, pause, skip to previous/next track, and adjust volume with a slider.
- **Search Functionality**: Filter tracks by title, artist, or genre using a search bar.
- **Visual Feedback**: Animated equalizer bars appear during playback, and the play button pulses.
- **Dark/Light Mode**: Toggle between light (yellow-themed) and dark modes for aesthetic flexibility.
- **Responsive Design**: Optimized for various screen sizes with a clean, modern layout.
- **Animations & Transitions**: Smooth transitions for buttons, playlist items, and mode toggling, with a fade-in effect for the header.

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Audio Handling**: HTML5 `<audio>` element with JavaScript Media API
- **Styling**: Custom CSS with Google Fonts (Poppins) and CSS animations
- **Storage**: Browser `localStorage` for persisting playlist metadata
- **No Backend**: Client-side only, using `URL.createObjectURL` for audio playback

## Installation
1. **Clone or Download the Project**:
   - Download or clone the `music-player` repository.
2. **Host Locally**:
   - Open the `index.html` in a web browser (e.g., Chrome, Firefox) by double-clicking or using a local server.
3. **Optional Local Server** (recommended for file uploads due to browser security):
   - Use a tool like `Live Server` in VS Code or run a simple server with Python:
     ```bash
     python -m http.server 8000
     ```
   - Access the app at `http://localhost:8000`.
4. **Dependencies**: No external dependencies are required, as the project uses vanilla JavaScript and Google Fonts (loaded via CDN).

## Usage
1. **Upload Tracks**:
   - Click the "Upload Music Files" button to select audio files (e.g., MP3).
   - Files are added to the playlist automatically.
2. **Control Playback**:
   - Click a track in the playlist to play it.
   - Use the play/pause (▶️/⏸), previous (⏮), and next (⏭) buttons.
   - Adjust volume with the slider (🔊).
3. **Manage Playlist**:
   - Search tracks by typing in the search bar (filters by title, artist, or genre).
   - Drag and drop tracks in the playlist to reorder them.
   - Click "Save Playlist" to store metadata in `localStorage`.
   - Click "Load Playlist" to retrieve saved tracks (re-upload files if needed due to browser restrictions).
4. **Toggle Theme**:
   - Click the "Toggle Dark/Light Mode" button to switch themes.
5. **Visual Feedback**:
   - The play button pulses, and equalizer bars animate when a track is playing.
   - The current track is highlighted in yellow in the playlist.

## Key Implementation Details
- **Audio Playback**:
  - Uses `URL.createObjectURL` to create temporary URLs for uploaded audio files.
  - The HTML5 `<audio>` element handles playback, with JavaScript controlling play, pause, and track skipping.
- **Playlist Management**:
  - Tracks are stored in a JavaScript array with mock metadata (title, artist, genre) derived from file names.
  - `localStorage` saves track metadata (not the files) for persistence.
  - Drag-and-drop uses the HTML5 Drag and Drop API for reordering tracks.
- **Search**:
  - Filters tracks dynamically based on user input, matching against title, artist, or genre.
- **UI/UX**:
  - Yellow color scheme (`#ffc107` primary, `#ffca28` hover) with light (`#fffde7`/`#fff9c4`) and dark (`#424242`/`#616161`) gradients.
  - Animations include a header fade-in, button pulse, equalizer bars, and hover transitions.
  - Responsive design with rounded buttons, a scrollable playlist, and a centered layout.
- **Limitations**:
  - Metadata is mocked (e.g., "Rock Artist" for files with "rock" in the name). For real metadata, integrate a library like `jsmediatags`.
  - Saved playlists require re-uploading audio files due to browser security restrictions on file access.
  - No backend, so audio files are not stored persistently.

## Future Enhancements
- **Metadata Extraction**: Use `jsmediatags` or similar to extract real audio metadata.
- **Backend Integration**: Add Node.js or Firebase to store audio files and playlists server-side.
- **Progress Bar**: Display track duration and progress with a seekable slider.
- **Error Handling**: Validate audio file formats and provide user feedback for unsupported files.
- **Visualizations**: Enhance the equalizer with real-time audio waveform visualizations using Web Audio API.

## Notes
- **Browser Compatibility**: Tested on modern browsers (Chrome, Firefox, Edge). File uploads may require a local server for full functionality.
- **Security**: Audio files are processed client-side, and no data is sent to external servers.
- **Performance**: Suitable for small to medium playlists. Large numbers of tracks may require optimization.

## Contributing
This is a solo internship project, but suggestions for improvements are welcome. Feel free to fork and enhance the code with additional features or bug fixes.

## License
This project is for educational purposes as part of the CodeAlpha internship. No formal license is applied.