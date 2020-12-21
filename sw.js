const HDFC_STATIC_ASSETS = 'HDFC_STATIC_ASSETS'
const HDFC_CACHE_ASSET_LIST = [
    '/',
    'index.html',
    '/dist/script.js',
    '/dist/style.css',
    'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500;1,600&display=swap',
]
self.addEventListener('install', (evt) => {

    evt.waitUntil(
        caches.open( HDFC_STATIC_ASSETS ).then( cache => {
            console.log('Cache Asset Created')
            cache.addAll( HDFC_CACHE_ASSET_LIST )
        })
    )

})


self.addEventListener('activate', (evt) => {
    console.log('Service Worker has been activated')
})


self.addEventListener('fetch', (evt) => {
   evt.respondWith(
       caches.match(evt.request).then( cacheRes => {
           return cacheRes || fetch(evt.request)
       })
   )
})