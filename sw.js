const CACHE_NAME = 'orn-hub-v1';
const urlsToCache = [
  '/orn-hub/',
  '/orn-hub/index.html',
  '/orn-hub/admin.html',
  '/orn-hub/orn-logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});