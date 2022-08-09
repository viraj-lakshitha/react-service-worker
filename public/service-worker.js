const CACHE_VERSION = "1.0.0";
const STATIC_CACHE = `static-react-app-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-react-app-${CACHE_VERSION}`;
const MAX_CACHE_LIMIT = 20;

const cachingItems = [
  "/",
  "/index.html",
  "/fallback.html",
  "/static/main.chunk.js",
  "/static/js/0.chunk.js",
  "/static/js/bundle.js",
];

// Limit caching (delete oldest cache items)
const handleCacheLimit = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache
          .delete(keys[0])
          .then(handleCacheLimit(name, size))
          .catch((error) => console.error(error));
      }
    });
  });
};

// Install Workers
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(cachingItems))
      .catch((error) => console.error("Unable to cache items", error))
  );
});

// Activate Workers
this.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch events and use caches
this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(event.request).then(async (fetchRes) => {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(event.request.url, fetchRes.clone());
            handleCacheLimit(DYNAMIC_CACHE, MAX_CACHE_LIMIT);
            return fetchRes;
          })
        );
      })
      .catch(() => {
        if (event.request.url.indexOf(".html") > -1) {
          return caches.match("/fallback.html");
        }
      })
  );
});
