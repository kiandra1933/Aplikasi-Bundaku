// Nama cache untuk aplikasi kita
const CACHE_NAME = 'bundaku-app-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalasi Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache terbuka');
      return cache.addAll(ASSETS);
    })
  );
});

// Menangkap request agar bisa offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Membersihkan cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
```