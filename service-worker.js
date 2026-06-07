const CACHE_NAME = 'deen-app-v2.2';

const FILES_TO_CACHE = [
  './index.html',
  './sunnah.html',
  './library.html',
  './masayel.html',
  './islamic-qa-accordion.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install — সব ফাইল cache করো
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate — পুরনো cache মুছে দাও
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch — আগে cache থেকে দাও, না থাকলে network থেকে
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
