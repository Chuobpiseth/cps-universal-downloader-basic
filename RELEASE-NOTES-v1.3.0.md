# CPS Universal Downloader Basic 1.3.0

This build repairs a blank desktop window on systems that block local ES
modules. The app serves its interface from a local loopback address. The
Windows installer also installs Microsoft Edge WebView2 if it is missing.

Repeated downloads of the same video are queued independently. The first
copy keeps its normal filename; later copies add `(1)`, `(2)`, and so on.
The old download archive no longer silently skips repeat requests.

The Basic source is published in this repository.

The app checks this Basic repository for later updates. Browser extension
files are copied to the fixed Documents folder; reload the unpacked extension
in Chrome or Edge after installing this build.

The runtime window and downloader engine passed a packaged startup smoke test.
Site downloads remain subject to each website's access rules and extractor
support; this build did not perform live downloads from every platform.
