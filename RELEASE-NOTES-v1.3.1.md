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

### 🩹 Hotfix (binaries updated, version unchanged)
- Fixed a bug where activating, importing, or deactivating a plugin/feature license could leave the app stuck on the "Starting…" splash screen until manually restarted.
- The splash screen now shows a retry button if startup fails, instead of spinning indefinitely.

---

## Verifying Downloads

| File | SHA-256 Checksum |
| :--- | :--- |
| `CPS-Universal-Downloader-v1.3.1-Portable.exe` | `154b72be85fac38258383dbc4a2823000c4107660f34b38528635a92f35c141f` |
| `CPS-Universal-Downloader-v1.3.1-Setup.exe` | `27e1a3e3d307f047743e4dcd826bb80e863ccde292312ddacbb4717d33314242` |
| `CPS-Universal-Downloader-v1.3.1-Windows-x64-Single-EXE.zip` | `dff1c54b64b84c54f891e893020d6ae388f3f3118071374fcff40284a1906eea` |
