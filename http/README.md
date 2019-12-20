## HTTP 5 levels protocols
~~~
application level
transform level
network level
datalink level
physical level
~~~
## HTTP phases
### HTTP/0.9
~~~
1.only support get request
2.no HEADER and other metadata
3.server will close TCP connection after sending message
~~~
### HTTP/1.0
~~~
1.support other request like post
2.add status code and header
3.add authentication, cache, support multiple charset
~~~
### HTTP/1.1
~~~
1.add long period time connetion
2.add pipeline to send multiple requests
3.add host and other commands
~~~
### HTTP/2
~~~
1.all data is transferred by binary
2.multiple requests can be sent not by the order
3.compress the HEADER and server push to boost the efficiency
~~~
## HTTP handshakes
~~~
three way handshakes to solve the delay problem of data transmission
SYN=1 Seq=0
SYN=1, ACK=1, Seq=0
ACK=1, Seq=1
~~~
## URI && URL && URN
~~~
Uniform Resource Identifier
Uniform Resource Locator
~~~
## HTTP content
~~~
request content
GET /test/hi-there.txt HTTP/1.0
Accept: text/*
Accept-Language: en, fr

responde content
HTTP/1.0 200 OK
Content-type: text/plain
Content-length: 19
body : 'I'm a message'
~~~
## Create HTTP Server
~~~
const http = require('http')
http.createServer(function(req, res){

    response.end('123')
}).listen(8888)

curl www.network.com -v
~~~
## Cross origin site request
~~~
http.createServer(function(req, res){
    response.writeHead(
        200, {
            'Access-Control-Allow-Origin': 'http://127.0.0.12;8887',
            'Access-Control-Allow-Headers': 'X-Test-Cors-diy-header',
            'Access-Control-Allow-Methods': 'POST, PUT, DELETE',
            'Access-Control-Max-Age': '1000'
        }
    )
    response.end('123')
}).listen(8888)
~~~
## Cache Control
~~~
Cache-control
public the cdn and other third party proxies can cache the resource
private only the browser can cache the resource
no-cache can cache the resource but need to be approved by server each time
no-store local and proxies can not cache anything

s-maxage also the cache period of max time for proxies
max-age max time for the cache period

must-revalidate need to be revalidate when resource expired for local
proxy-revalidate

no-transform tell the poxies don't change the format of resource

http.createServer(function(req, res){
    if (req.url === '/script.js') { //if the url is the same after refreshing the page, the brower will get local cache
        res.writeHead(
        200, {
            'Content-Type': 'text/javascript',
            'Cache-Control': 'max-age=200, no-cache'
        }
    )
    res.end('123')
    }
    
}).listen(8888)
~~~
## Last Modified && Etag
~~~
http.createServer(function(req, res){
    if (req.url === '/script.js') { //if the url is the same after refreshing the page, the brower will get local cache
        res.writeHead(
        200, {
            'Content-Type': 'text/javascript',
            'Cache-Control': 'max-age=20000, no-cache',
            'Last-Modified': '123',
            'Etag': '777'
        })
        const etag = req.headers['if-none-match']
        if (etag === '777') {
            res.writeHead(
                200, {
                    'Content-Type': 'text/javascript',
                    'Cache-Control': 'max-age=20000, no-cache',
                    'Last-Modified': '123',
                    'Etag': '777'
                })
            res.end('')
        } else {
            res.writeHead(
                200, {
                    'Content-Type': 'text/javascript',
                    'Cache-Control': 'max-age=20000, no-cache',
                    'Last-Modified': '123',
                    'Etag': 'newTage'
                })
            res.end('')
        }
        res.end('123')
    }
    
}).listen(8888)

the browser will send If-Modified-Since and If-None-Match next time to retrieve the resource from server
~~~