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
                '/js/restaurant_info.js',
                '/data/restaurants.json',
                '/css/styles.css',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
                '/img/favicon.png',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
                'https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css'
            ]);
        })
    );
});

// Upon fetch event.

self.addEventListener('fetch', (event) => {

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    console.log('Success, ', event.request, ' is returned from fetching cache');
                    return response;
                } else {
                    return fetch(event.request)
                        .then((response) => {
                            const res = response.clone();
                            caches.open('RRA-v1').then(cache => {
                                cache.put(event.request, res);
                            })
                            return response;
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            })
    );
});

//  Upon activation event.
self.addEventListener('activate', (event) => {

    var cacheWhitelist = ['RRA-v1'];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});