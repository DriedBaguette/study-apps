// Offline support: always try the network first so updates show up right away,
// fall back to the saved copy when offline. GitHub sync calls are never cached.
const CACHE = 'study-apps-2026-10-19';
const CORE = ['./', 'index.html', 'calc.html', 'precalc.html', 'history.html', 'scratch.html', 'calc.webmanifest', 'precalc.webmanifest', 'history.webmanifest', 'scratch.webmanifest',
  'icons/calc-192.png', 'icons/precalc-192.png', 'icons/history-192.png', 'icons/scratch-192.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  // only old copies of the app: the reader's model (study-reader-*) is 120 MB and must survive updates
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('study-apps-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  const fonts = url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !fonts) return;
  // Our own files skip the browser's HTTP cache (GitHub Pages lets it keep them 10 minutes), so a reload
  // after "New version ready" really gets the new version. It still asks the server cheaply (ETag).
  e.respondWith(
    fetch(fonts ? req : new Request(req, { cache: 'no-cache' })).then(res => {
      if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
