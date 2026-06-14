const CACHE_NAME = "unfolding-world-domestic-cn-44";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=cinematic-cn-44",
  "./motion-luxury.css?v=cinematic-cn-44",
  "./site-motion-patch.js?v=cinematic-cn-44",
  "./app.js?v=cinematic-cn-44"
];

async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(APP_SHELL);
}

async function cacheFirst(request) {
  const cached = await caches.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);

  if (response && response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }

  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);

    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    const cached = await caches.match(request);

    if (cached) {
      return cached;
    }

    throw error;
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheAppShell());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith("unfolding-world-domestic-") && name !== CACHE_NAME)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (url.pathname.includes("/assets/destinations/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (APP_SHELL.some((item) => {
    const path = item.replace("./", "").split("?")[0];
    return path ? url.pathname.endsWith(path) : url.pathname.endsWith("/");
  })) {
    event.respondWith(networkFirst(request));
  }
});
