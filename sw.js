// کار بدون اینترنت: همهٔ فایل‌ها یک بار ذخیره می‌شن. بعد از هر تغییر در فایل‌ها، عدد VERSION رو یکی بیشتر کن.
const VERSION = 'zig-v4';
const FILES = ['./', 'index.html', 'zigorat-cover-maker.html', 'zigorat-size-guide.html', 'manifest.webmanifest',
  'icon-192.png', 'icon-512.png', 'icon-maskable.png', 'apple-touch-icon.png',
  'baloo.ttf', 'changa.ttf', 'estedad.ttf', 'jomhuria.ttf', 'kufi.ttf', 'lalezar.ttf', 'markazi.ttf', 'messiri.ttf', 'reemkufi.ttf', 'ruqaa.ttf', 'sahel.ttf', 'shabnam.ttf', 'vazirmatn.ttf'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
// اول از اینترنت (تا نسخهٔ جدید برسه)، اگه اینترنت نبود از حافظه
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match('index.html'))));
});
