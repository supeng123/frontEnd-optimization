## XSS
~~~
Cross Site Script
1.it can get the contents from the client page,
2.get the cookies
3.hajack the frontend code logic
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