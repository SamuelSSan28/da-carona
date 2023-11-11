/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from 'workbox-precaching';

const CACHE_NAME = 'da-carona-app';
const CACHE_VERSION = 1;
const CACHE_KEY = `app-cache-v${CACHE_VERSION}`;

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

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_KEY)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Atualização a cada 24 horas
const updateInterval = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

setInterval(() => {
  self.skipWaiting(); // Força a ativação do novo service worker
}, updateInterval);