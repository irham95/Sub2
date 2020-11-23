const CACHE_NAME = "LigaInggris2020/21";
let urlToCache = [  

    <link rel="preconnect" href="https://fonts.googleapis.com"></link>,
    './',
    './css/materialize.min.css',
    './css/style.css',
    './js/api.js',
    './js/db.js',
    './js/idb.js',
    './push.js',
    './js/materialize.min.js',
    './js/nav.js',
    './js/main.js',
    './js/script.js',
    './pages/pertandingan.html',
    './pages/tersimpan.html',
    './pages/klasemen.html',
    './index.html',
    './nav.html',
    './images/icon-192x192.png',
    './images/icon-512x512.png',
    './images/logo.svg',
    "./images/favicon/apple-icon-57x57.png",
    "./images/favicon/apple-icon-60x60.png",
    "./images/favicon/apple-icon-72x72.png",
    "./images/favicon/apple-icon-76x76.png",
    "./images/favicon/apple-icon-114x114.png",
    "./images/favicon/apple-icon-120x120.png",
    "./images/favicon/apple-icon-144x144.png",
    "./images/favicon/apple-icon-152x152.png",
    "./images/favicon/apple-icon-180x180.png",
    "./images/favicon/android-icon-192x192.png",
    "./images/favicon/favicon-32x32.png",
    "./images/favicon/favicon-96x96.png",
    "./images/favicon/favicon-16x16.png",
    "./images/favicon/favicon.ico",
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    'https://code.jquery.com/jquery-2.1.1.min.js',
    ];


  self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.info('[./js/main.js] cached all files');
            return cache.addAll(urlToCache);
        })
    );
});


self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys()
    .then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName){
          if(cacheName != CACHE_NAME){  
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
})

self.addEventListener("fetch", function(event) {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {'ignoreSearch': true}).then(function(response) {
                return response || fetch (event.request);
            })
        )
    }
});



self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: './images/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
