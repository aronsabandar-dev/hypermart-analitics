// Versi cache — naikkan angka ini setiap deploy baru agar HP otomatis refresh
const CACHE_VERSION = 'v7';
const CACHE_NAME = `hm284-analytics-${CACHE_VERSION}`;

// Install: cache halaman utama
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(['/']))
  );
  // Langsung aktif tanpa tunggu tab lama ditutup
  self.skipWaiting();
});

// Activate: hapus semua cache versi lama otomatis
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k.startsWith('hm284-analytics-') && k !== CACHE_NAME)
          .map(k => {
            console.log('[SW] Hapus cache lama:', k);
            return caches.delete(k);
          })
      )
    ).then(() => self.clients.claim()) // ambil alih semua tab langsung
  );
});

// Fetch: Network First untuk HTML, Cache First untuk aset statis
self.addEventListener('fetch', e => {
  if (!e.request.url.startsWith(self.location.origin)) return;
  if (e.request.method !== 'GET') return;

  const isHTML = e.request.headers.get('accept')?.includes('text/html');

  if (isHTML) {
    // HTML: selalu ambil dari network, fallback ke cache kalau offline
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.status === 200) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Aset lain: cache first, update di background
    e.respondWith(
      caches.match(e.request).then(cached => {
        const networkFetch = fetch(e.request).then(res => {
          if (res && res.status === 200) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
          }
          return res;
        });
        return cached || networkFetch;
      })
    );
  }
});

// Terima pesan dari app untuk force refresh cache
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
  if (e.data === 'CLEAR_CACHE') {
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    );
  }
});
