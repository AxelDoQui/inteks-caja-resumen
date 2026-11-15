// Service worker de "InTeks Caja — Resumen". Solo cachea el cascarón (HTML,
// manifest, iconos) para que la app abra al instante; los datos de verdad
// (resumenApp) van siempre a la red, nunca a caché — serían cifras viejas.
var VERSION = 'caja-resumen-v1';
var ARCHIVOS = ['./', 'index.html', 'manifest.webmanifest',
  'icono-192.png', 'icono-512.png', 'icono-maskable-512.png'];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(ARCHIVOS); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (claves) {
      return Promise.all(claves.filter(function (k) { return k !== VERSION; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  // Solo el cascarón, y solo GET: todo lo demás (las llamadas a Apps Script)
  // pasa de largo a la red, tal cual.
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(function (resp) {
      return resp || fetch(e.request);
    })
  );
});
