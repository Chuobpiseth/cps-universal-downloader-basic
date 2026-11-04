# CPS Universal Downloader Basic

Public Basic edition of CPS Universal Downloader.

## Version 1.3.0

The Basic release includes ordinary downloads and conversion for YouTube,
Facebook, TikTok, Douyin, Xiaohongshu/RedNote, Pinterest, Instagram, and
other supported sites, plus playlist selection, AI tools, and browser-extension
integration.

Updates are published from this repository. The application checks the latest
GitHub release and updates the bundled browser extension from its fixed local
folder. Download only media you own or are authorized to access.

Release assets and checksums are published on the [Releases](../../releases)
page. The Windows executable includes Python and does not require users to
install Python or Node.js. The desktop interface uses Microsoft Edge WebView2.

This repository contains the complete Basic 1.3.0 source. To build locally,
install Python, Deno, and Inno Setup 6, put `deno.exe`, `yt-dlp.exe`, and
`ffmpeg.exe` in the parent directory's `tools` folder, and run
`build-portable.ps1` followed by `build-installer.ps1`.

The Basic source is licensed under [GPL-3.0](LICENSE). Third-party tools,
fonts, and assets retain their own licenses.
