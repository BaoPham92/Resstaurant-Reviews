console.log(`service worker is registered`);

// Upon installation event.

self.addEventListener('install', (event) => {
    const staticCacheName = 'RRA-v1'; // RRA = "Restaurant Review App."

    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restuarant.js',
                '/data/restaurant.json',
                '/css/styles.css',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
                'https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css'
            ]);
        })
    );
});