# 🎵 MusiqueApp - Local Music Management & Player

A modern Angular-based web application for managing and playing local music files. Store, organize, and enjoy your personal music library directly in your browser with offline support using IndexedDB.

![Angular](https://img.shields.io/badge/Angular-20-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **🎶 Music Library Management** - Add, edit, and delete tracks from your personal collection
- **🔍 Search & Filter** - Search tracks by title or artist, filter by genre
- **▶️ Audio Player** - Full-featured player with play/pause, seek, volume control, and progress tracking
- **⏭️ Playlist Navigation** - Next/previous track support
- **💾 Offline Storage** - All music stored locally using IndexedDB (Dexie.js)
- **📱 Responsive Design** - Built with TailwindCSS for a modern, responsive UI
- **🖼️ Cover Art Support** - Add custom cover images to your tracks

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Angular 20** | Frontend framework with signals-based reactivity |
| **TypeScript** | Type-safe JavaScript |
| **TailwindCSS 4** | Utility-first CSS framework |
| **Dexie.js** | IndexedDB wrapper for offline storage |
| **Howler.js** | Audio library types |
| **RxJS** | Reactive programming |

## 📁 Project Structure

```
src/app/
├── components/
│   ├── player/          # Audio player component
│   └── track-form/      # Add/Edit track form
├── pages/
│   ├── library/         # Main music library view
│   ├── track-detail/    # Individual track details
│   └── error404/        # 404 error page
├── services/
│   ├── audio-player.ts  # Audio playback service
│   ├── track.ts         # Track management service
│   └── storage.ts       # IndexedDB storage service
├── models/
│   └── track.model.ts   # Track data model
├── db/
│   └── music.db.ts      # Dexie database configuration
└── auth/
    └── auth.guard.ts    # Route guard
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ABDERRAZZAK-IMILY/Application-de-Gestion-et-Lecture-de-Musique-Locale-.git
   cd Application-de-Gestion-et-Lecture-de-Musique-Locale-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   This command builds TailwindCSS and starts the Angular dev server concurrently.

4. **Open in browser**
   Navigate to `http://localhost:4200`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Build Tailwind & start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run test` | Run unit tests with Karma |
| `npm run tailwind` | Watch and compile TailwindCSS |
| `npm run tailwind:build` | Build and minify TailwindCSS |

## 🎵 Track Model

Each track in the library contains:

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier |
| `title` | string | Track title |
| `artist` | string | Artist name |
| `description` | string? | Optional description |
| `genre` | string | Music genre |
| `duration` | number | Track duration in seconds |
| `addedDate` | Date | Date added to library |
| `coverImage` | Blob/string? | Optional cover artwork |
| `audioFile` | Blob | Audio file data |
| `audioUrl` | string | Audio file URL |

### Supported Audio Formats

- MP3 (audio/mpeg)
- WAV (audio/wav)
- OGG (audio/ogg)

**Max file size:** 10MB

## 🔗 Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | - | Redirects to `/library` |
| `/library` | Library | Main music library view |
| `/track/:id` | TrackDetail | View track details |
| `/add` | TrackForm | Add new track |
| `/edit/:id` | TrackForm | Edit existing track |
| `/**` | Error404 | 404 error page |

`

## 📦 Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.


