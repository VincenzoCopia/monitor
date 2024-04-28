const urlsToCache = [
    '/',
    '/index.html',
    '/static/log01.png',
    '/styles.css',
    '/app.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('my-pwa-cache').then(cache => {
            return Promise.all(
                urlsToCache.map(url => {
                    return cache.add(url).catch(err => {
                        console.warn(`Failed to cache ${url}: ${err}`);
                        return null;
                    });
                })
            );
        })
    );
});
