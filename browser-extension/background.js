const API = 'http://127.0.0.1:38473';
const EXTENSION_VERSION = chrome.runtime.getManifest().version;
const apiHeaders = token => ({ 'X-CPS-Token': token, 'X-CPS-Extension-Version': EXTENSION_VERSION });

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => chrome.contextMenus.create({ id: 'cps-video', title: 'Download with CPS Universal Downloader', contexts: ['page', 'link', 'video', 'image'] }));
  chrome.alarms.create('cps-app-version', { delayInMinutes: 1, periodInMinutes: 1 });
  reloadForUpdatedApp().catch(() => {});
});

chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create('cps-app-version', { delayInMinutes: 1, periodInMinutes: 1 });
  reloadForUpdatedApp().catch(() => {});
});

async function getToken() { return (await chrome.storage.local.get('apiToken')).apiToken || ''; }

async function getStatus() {
  const token = await getToken();
  const response = await fetch(`${API}/status`, { headers: apiHeaders(token) });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'CPS Universal Downloader is not ready.');
  return payload;
}

async function reloadForUpdatedApp() {
  const status = await getStatus();
  const stored = await chrome.storage.local.get('lastCpsAppVersion');
  if (!stored.lastCpsAppVersion) {
    await chrome.storage.local.set({ lastCpsAppVersion: status.version });
  } else if (stored.lastCpsAppVersion !== status.version) {
    await chrome.storage.local.set({ lastCpsAppVersion: status.version });
    chrome.runtime.reload();
  }
}

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'cps-app-version') reloadForUpdatedApp().catch(() => {});
});

async function sendUrl(url, mode = 'video', quality = 'Best', pageUrl = '') {
  if (!/^https?:\/\//i.test(url) || url.length > 32768) throw new Error('Invalid URL');
  const token = await getToken();
  const response = await fetch(`${API}/download`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...apiHeaders(token) }, body: JSON.stringify({ url, pageUrl, mode, quality }) });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(response.status === 401 ? 'Connect the extension token in CPS Settings.' : (payload.error || 'CPS Universal Downloader is not running.'));
  }
  return response.json();
}

async function sendDiscoveredCollection(message) {
  const token = await getToken();
  const response = await fetch(`${API}/discover`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...apiHeaders(token) },
    body: JSON.stringify({ url: message.pageUrl, title: message.title, entries: message.entries }),
  });
  if (!response.ok) throw new Error('CPS Universal Downloader is not ready to receive this profile.');
  return response.json();
}

chrome.contextMenus.onClicked.addListener((info, tab) => sendUrl(info.linkUrl || info.srcUrl || info.pageUrl || tab.url, info.mediaType === 'image' ? 'image' : 'video', info.mediaType === 'image' ? 'Original' : 'Best', info.pageUrl || tab.url || '').catch(() => {}));
chrome.runtime.onMessage.addListener((message, sender, respond) => {
  if (message.type === 'CPS_SEND_URL') { sendUrl(message.url, message.mode).then(data => respond({ ok: true, data })).catch(error => respond({ ok: false, error: error.message })); return true; }
  if (message.type === 'CPS_DOWNLOAD') { sendUrl(message.url, message.mode, message.quality, message.pageUrl).then(data => respond({ ok: true, data })).catch(error => respond({ ok: false, error: error.message })); return true; }
  if (message.type === 'CPS_DISCOVERED_COLLECTION') { sendDiscoveredCollection(message).then(data => respond({ ok: true, data })).catch(error => respond({ ok: false, error: error.message })); return true; }
  if (message.type === 'CPS_STATUS') { getStatus().then(data => respond({ ok: true, data })).catch(error => respond({ ok: false, error: error.message })); return true; }
});
