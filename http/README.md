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