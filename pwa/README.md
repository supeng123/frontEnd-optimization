## Web App Manifest
~~~
Import manifest.json to index.html
<link rel=”manifest” href=”manifest.json”>

Configurations for manifest
{
	“name”: “Slogan APP”,
	“short_name”: “SA”,
	“start_url”: “/index.html”,
	“icons”: [
	{
		“src”: “icon/hd_hi.ico”,
		“size”: “72x72”
		“type”: “image/webp”
}
],
	“background_color”: ,
	“theme_color”: ,
	“display”: “standalone”
}
~~~
## Service Worker
### web worker description
~~~
web worker is an independent thread, it can't manipulate the DOM and BOM, following steps show how to use web worker
1. create web worker  var worker = new Worker('work.ks')
2. process all the computation in web work
3. after computating, via self.postMessage(msg) to send message to main thread
4. the main thread uses worker.onmessage = function(msg) monitoring messages
5. mian thread can communicate to the web work using the same method.
~~~
### web worker example
~~~
create work.js, in this file
let total = 0;
for (var i = 0; i < 1000; i++) {
    total += i;
}
self.postMessage({total})

create index.html. in script
<script>
    console.log('start')
    const worker = new Worker('work.js')
    worker.addEventListener('message', e => {
        console.log(e.data)
    })
    console.log('stop')
<script>
~~~
### service worker example
~~~
window.onLoad = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
        .then(registration => {
            console.log(registration)
        })
        .catch((e) => console.log(e));
    }
}
~~~
### service worker lifecycle hook
~~~
Install, invoke this event when service worker register successfully, using caching resources
Activate, invoke this event when service worker activated, using deleting old resources
Fetch, invoke this event when send the request, using manipulating resources and retrieve network resources
~~~
### service worker example
~~~
self.addEventListener(‘install’, (e) => {
//let service worker jump out of waiting period, go into activate period
	event.waitUntil(self.skipWaiting())	
})

self.addEventListener(‘activate’, (e) => {
//automatically get the controller power
	event.waitUntil(self.clients.claim())
})

self.addEventListener(‘fetch’, (e) => {
	fetch(‘data.json’).then((res)=> {
		return res.json()
}).catch(data => console.log(data))
})
~~~
## Caches API
~~~
const CACHE_NAME = 'cache_v1'
self.addEventListener(‘install’, (e) => {
    const cache = await caches.open(CACHE_NAME)
    await cache.addAll([
        '/',
        '/images/logo.png',
        '/manifest.json',
        '/index.css'
    ])
	await event.waitUntil(self.skipWaiting())	
})

self.addEventListener(‘activate’, async (e) => {
    const keys = await caches.keys()
    keys.forEach(key => {
        if (key !== CACHE_NAME) {
            caches.delete(key)
        }
    })
	event.waitUntil(self.clients.claim())
})

self.addEventListener(‘fetch’, (e) => {
    const req = e.request
    e.respondeWith(netWorkFirst(req))
})

async function netWorkFirst(req) {
    try {
        const fresh = await fetch(req)
        return fresh
    } catch (e) {
        const cache = await caches.open(CACHE_NAME)
        const cached = await cache.match(req)
        return cached
    }
}

async function cacheFirst() {

}
~~~
## Notification