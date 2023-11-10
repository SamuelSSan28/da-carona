/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from 'workbox-precaching';

const CACHE_NAME = 'da-carona-app';

// Esta é a parte crucial onde __WB_MANIFEST é usado
precacheAndRoute(self.__WB_MANIFEST);

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
