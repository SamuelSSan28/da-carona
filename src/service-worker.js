// service-worker.js

const CACHE_NAME = 'da-carona-app';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          // Lista de arquivos a serem armazenados em cache
          '/',
          '/index.html',
          '/manifest.json',
          // Adicione mais arquivos conforme necessário
        ]);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
