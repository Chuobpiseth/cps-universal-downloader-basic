# CPS Universal Downloader 1.3.1

CPS Universal Downloader 1.3.1 brings major stability improvements, direct browser fallback streams, 3D extension visuals, customizable audio notifications, and quiet Windows startup.

## What's New in v1.3.1

### 🚀 Download Engine Acceleration & Preparation Feedback
- Added instant 1%–10% simulated visual preparation response while media streams and extractor clients are negotiated.
- Smooth turbo concurrency from 10% to 100% with high-throughput parallel downloads.
- Direct stream fallback (`directUrl`): automatically retrieves browser-authenticated CDN streams when platforms reject generic web scraping.

### 🎥 Instagram & TikTok Enhancements
- Fixed Instagram audio link detection: properly isolates post permalinks (`/reel/`, `/p/`) and rejects audio track collisions (`/reels/audio/`).
- Follower-only & private reel fallback: captures and downloads protected Instagram reels directly via the browser extension without needing manual cookie export.
- TikTok companion button: refined on-screen floating trigger and player detection.

### 💎 3D Liquid Glass Browser Companion Extension
- Redesigned extension UI with liquid glass aesthetics, 3D elevation, and deep drop shadows.
- Real-time desktop token connection status with 1-click sync.
- Persistent floating download button attached above active video players.

### 🔔 Desktop Notifications & Customizable Chime Styles
- Added 5 local audio chime styles: *Crystal Chime, Soft Bell, Bright Pop, Gentle Marimba, Classic Ding*.
- Native Windows 10/11 toast alerts with sound preview controls in Settings.

### 🔕 Silent Windows Startup (System Tray)
- When "Start with Windows" is active, CPS launches quietly into the background System Tray / Notification Area without displaying a window or interrupting your work.

### 🛡️ Creator Studio & Zero Blank Screen Stability
- Fixed Creator Studio tab switching (Clips, Subtitles, Creator Pack, Recipes, AI Skills).
- Added React ErrorBoundary and missing icon fallbacks to eliminate dark blank screen crashes under all network conditions.
- Interactive bilingual release notes popup with 1-click language switcher (`English` / `ភាសាខ្មែរ`).

### 🔌 Optional Trusted Plugins
- Telegram Private Content download plugin available in the Plugins tab with offline hardware-bound signed licensing and complete local privacy.

---

## Verifying Downloads

| File | SHA-256 Checksum |
| :--- | :--- |
| `CPS-Universal-Downloader-v1.3.1-Portable.exe` | `ddcc8ebb2e9eee367ec2622428ab0ff55dcda15da0ee82ebe99954661c8ecca5` |
| `CPS-Universal-Downloader-v1.3.1-Setup.exe` | `cfe89d5f23673fa849b82facdbcf53bd65b59ac88c24017dde663678f2196dcc` |
| `CPS-Universal-Downloader-v1.3.1-Windows-x64-Single-EXE.zip` | `b5d6b915e12ba6a410343e8bb2db3b80fcdd349de1d8037df77d34dfe8644520` |
