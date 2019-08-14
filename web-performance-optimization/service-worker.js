self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('opp-v1')
        .then((cache) => {
            console.log('open cache')
            return cache.addAll([
                './app.js',
                './main.css',
                './index.html'
            ])
        })
    )
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
        .then((res) => {
            if (res) {
                return res
            } else {
                fetch(url).then((res) => {
                    if (res) {
                        //add cache
                    }
                })
            }
        })
    )
})

self.addEventListener('message', (e) => {
    var promise = self.clients.matchAll()
        .then((clientList) => {
            var sendID = e.source ? e.resouce.id : 'unknown'
            clientList.forEach((client) => {
                if (client.id === sendID) {
                    return
                } else {
                    client.postMessage({
                        client: sendID,
                        message: e.data
                    })
                }
            })
        })
    e.waitUntil(promise)
})