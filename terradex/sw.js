const CACHE = 'terradex-v9';
const SHELL = [
  './', './index.html', './data.js', './map-data.js',
  './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-512.png',
  './img/missoula-mt.jpg', './img/firestone-co.jpg', './img/estes-park-co.jpg',
  './img/rochester-ny.jpg', './img/geneseo-ny.jpg', './img/leavenworth-ks.jpg',
  './img/washington-dc.jpg', './img/atchison-ks.jpg', './img/hamilton-mt.jpg',
  './img/los-angeles-ca.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first so new entries land on next open; cache fallback keeps it working offline.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() =>
        caches.match(e.request).then(m => m || caches.match('./index.html'))
      )
  );
});
