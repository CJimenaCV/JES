// Nombre del caché
const CACHE_NAME = "cache-v1";

// Archivos que se guardarán en caché
const FILES_TO_CACHE = [
  "/index.html",                 // index.html
  "/views/offline.html",     // página especial para offline
  "/style.css",
  "/iconos/",
];

// Evento INSTALL: se ejecuta la primera vez que se registra el SW
self.addEventListener("install", event => {
  console.log("Service Worker: Instalado");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Archivos cacheados");
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Evento ACTIVATE: se ejecuta cuando el SW se activa y limpia cachés antiguas
self.addEventListener("activate", event => {
  console.log("Service Worker: Activado");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Cache antiguo eliminado:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Evento FETCH: intercepta peticiones
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si la petición fue exitosa, la devolvemos
        return response;
      })
      .catch(() => {
        // Si falla (estás offline), intenta servir desde caché
        return caches.match(event.request)
          .then(cached => {
            // Si no está cachéado, devuelve offline.html (si aplica)
            return cached || caches.match("/offline.html");
          });
      })
  );
});
