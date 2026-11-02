const CACHE = 'talking-cat-v2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './cat.jpg', './icon-180.png', './icon-192.png', './icon-512.png',
  './voice/yes.mp3', './voice/no.mp3', './voice/nope.mp3', './voice/maybe.mp3', './voice/laugh.mp3', './voice/ugh.mp3', './voice/mmm.mp3'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network-first so updates land; cache keeps it working offline.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request).then(m => m || caches.match('./index.html')))
  );
});
