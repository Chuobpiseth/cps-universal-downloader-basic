import importlib.util
import json
import sys
import threading
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("cps_basic_backend", ROOT / "backend" / "app.py")
backend = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = backend
SPEC.loader.exec_module(backend)


class BasicTests(unittest.TestCase):
    def test_url_validation(self):
        self.assertEqual("https://youtube.com/watch?v=abc", backend.validate_url(" https://youtube.com/watch?v=abc "))
        with self.assertRaises(ValueError):
            backend.validate_url("file:///secret.txt")

    def test_best_quality(self):
        self.assertEqual("bestvideo+bestaudio/best", backend.format_selector("Best"))

    def test_repeated_video_is_queued_with_a_numbered_filename(self):
        api = backend.DesktopApi.__new__(backend.DesktopApi)
        api._lock = threading.RLock()
        api.queue = []
        api.history = []
        api.settings = {"filenameTemplate": "%(title)s [%(id)s].%(ext)s"}
        api._save_queue = lambda: None
        api._log_activity = lambda *_args: None
        url = "https://youtube.com/watch?v=abc"
        for number in range(3):
            result = api.add_urls([{"url": url}], {"kind": "Video"})
            self.assertEqual(1, result["count"])
            self.assertEqual(number, api.queue[-1]["duplicateNumber"])
        self.assertEqual("%(title)s [%(id)s] (2).%(ext)s", api._download_filename_template(api.queue[-1]))

    def test_public_extension_has_no_private_transfer_script(self):
        manifest = json.loads((ROOT / "browser-extension" / "manifest.json").read_text(encoding="utf-8"))
        scripts = [name for item in manifest["content_scripts"] for name in item["js"]]
        self.assertEqual(["content.js"], scripts)

    def test_basic_has_no_paid_feature_api(self):
        api = backend.DesktopApi.__new__(backend.DesktopApi)
        self.assertEqual("CPS Universal Downloader Basic", api._display_name())
        self.assertFalse(hasattr(api, "get_feature_offer"))
