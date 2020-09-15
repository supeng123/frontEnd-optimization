## XSS
~~~
Cross Site Script
1.it can get the contents from the client page,
2.get the cookies
3.hijack the frontend code logic
4.send http requests
5.steal the website data
6.steal the information of users
7.steal the user password for banks
8.cheat on users
if developer never filter the arguments from client, if can be changed the content if attacker use this loophole, any input from the client page should be filtered by developers

reflective type attack generally uses in http request address
savable type attack can be saved in Database
~~~
### where can xss be attacking
~~~
1.HTML nodes content
<div>#{content}</div>

<div>
    <script></script>
</div>
2.HTML attributes
<img src="#{image}">
<img src="1" onerror="alert(1)">
3.Javascript codes
<script>
    var data = "#{data}"
    var data = "hello";alert(1);"";
</script>
4.rich  texts
~~~
### how to defend xss
~~~
backend set protection
ctx.set('X-XSS-Protection', 1)

1. for html nodes content use escape character to transfer <>
function escapeHtml = (str) => {
    str = str.replace(/</g, '&lt;')
    str = str.replace(/>/g, '&gt;')
    return str;
}
2. for html attributes use escape charactor to transfer ""
function escapeHtml = (str) => {
    str = str.replace(/&/g, '&lt;')
    str = str.replace(/"/g, '&quto;')
    str = str.replace(/'/g, '&#39;')
    str = str.replace(/ /g, '&#32;')
    return str;
}
3. for javascript attack
funciton escapeForJs = (str) => {
    JSON.stringify(str)
    // or
    str = str.replace(/\\/g, '\\\\')
    str = str.replace(/"/g, '\\"')
    return str;
}
4. for rich texts
use whiteList to filter potential attack elements
function xssFilter = (str) => {
    const xss = require('xss')
    const filterStr = xss(str, () => {
        return '';
    })
    str = str.replace(/onerror\s*=\s*['"]?[^'"]*['"]?/g, '')
    str = str.replace(/javascript:[^'"*]/g, '')
    return str.replace(/<\s*\/?script\s*>/g, '')
}
~~~

### CSP
~~~
Content Security Policy

child-src content-src default-src
font-src frame-src img-src
manifest-src media-src object-src
script-src style-src worker-swrc

<host-source>
<schema-source>
'self'
'unsafe-inline' 'unsafe-eval' 'none'
'nouce<base64-value>'
<hash-source>
'strict-dynamic'

ctx.set(`Content-Security-Policy`: `default-src 'self' `)
~~~

## CSRF
~~~
Cross Site Request Forge
definition: the frontend of website A logined into the backend of website A, and hold the credentials, the fronted of Website B logined into the backend of Webesite A with it's credentials
~~~
### how to defend CSRF
~~~
1. set cookies "sameSite"
ctx.cookies.set('userid': user.id, {
    httpOnly: false,
    sameSite: 'strict'
})
2. add verication information in frontend page, like verication codes, token
3. verify referer from B website
const referer = ctx.request.headers.referer
if (!/^https?:\/\/localhost/.test(referer) ) {
    throw new Error('referer error')
}
~~~

## Cookies
~~~
1.could be written from backend to set cookie by http request
ctx.cookies.set('useId: 2')
2.could be read and written from frontend
document.cookie="useId=2"
document.cookie
3.should be from the same domain

features: domain/expired date/path/http-only/secure/sameSite

use cookie signature with id to encrypt the credentials

xss can read the cookie, so use httpOnly to prevent attackers from stealing cookies,
csrf can use the cookie to forge credentials, so use sameSite to prevent attackers from using cookies
~~~

## Click hijack
~~~
useer unconciously click the attacker's page with transparent under attack page
<body style="background:url(111.png) no-repeat">
    <iframe style="opacity:0" src="http://xxx.com/post/15" width= "800" height="600" sandbox="allow-forms"></iframe>
</body>

solution
1. using javascript to prevent website being embeded
if(top.location === window.location)
2. X-FRAME-OPTIONS
ctx.set('X-Frame-Options', 'DENY')
~~~

## HTTP manipulation
~~~
redirector to new website, telecommunication hijack, intranet hijack, malicious advertise

TLS/SSL encryption

1.server send its public key to apply certificate from certification association center,
2.CA will check the validation of server domain
3.client send http request
4.server provide the certification and public key
5.client build-in certificates list will verify the cerficate from server

https.createServer({
    key: fs.readFileSync('./cert/private.key'),
    cert: fs.readFileSync('./cert/fullchain.crt')
})
~~~