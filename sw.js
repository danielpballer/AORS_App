/* AORS 2026 planner service worker.
   Core files: network first with a short timeout, falling back to the cache, so updates arrive when
   there is signal and the app still opens when there is none. Fonts: cache first. */
const VERSION = 'aors-v2';
const CORE = ['./', './index.html', './data.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'];
const NET_TIMEOUT_MS = 4000;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

function withTimeout(promise, ms){
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    promise.then(v => { clearTimeout(t); resolve(v); }, err => { clearTimeout(t); reject(err); });
  });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!sameOrigin && !isFont) return;

  if (isFont){
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(req); if (hit) return hit;
      try { const res = await fetch(req); if (res.ok) c.put(req, res.clone()); return res; }
      catch(err){ return new Response('', {status: 503}); }
    }));
    return;
  }

  e.respondWith(caches.open(VERSION).then(async c => {
    const cacheKey = req.mode === 'navigate' ? './index.html' : req;
    try {
      const res = await withTimeout(fetch(req), NET_TIMEOUT_MS);
      if (res.ok) c.put(cacheKey, res.clone());
      return res;
    } catch(err){
      const hit = await c.match(cacheKey) || (req.mode === 'navigate' ? await c.match('./index.html') : null);
      return hit || new Response('Offline and not cached yet.', {status: 503, headers: {'Content-Type': 'text/plain'}});
    }
  }));
});

self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });
