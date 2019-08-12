## Merge and compress Internet resources
~~~
potential optimization points on the process of http request
1. reduce the dns detection time by caching
2. take the short cut in environment of network
3. caching the same static resources
4. reduce the size of http request
5. reduce the times of http request
6. server rendering
~~~
### Compress html && css && javascript
~~~
remove the no need words like blank spaces and html comments
1. use online website tools to compress
2. use html-minifier provided by nodejs
3. use back end template render enigine compress like jade
4. use clean-css tool compressing css
5. uglifyjs2 to compress javascript

merge resources
disadvantages: extend first page render time, caches update frequently
~~~
### Image optimization
~~~
the difference between png8/png24/pgn32,
png8 --- 256 different colors + support transparent
png24 --- 2*24 different colors + does not support transparent
png32 --- 2*24 different colors + support transparent

jpg-- for thoes does not need the transparent pictures
png-- for thoes does need the transparent pictures
webp -- for android
svg -- for simple illustration

css sprite reduce the http requests, but the size will be enlarged
image inline embed images into html
~~~
### Loading process of Css and Javascript
~~~
Html-->Dom--->
Css--->Cssom--->
then the render tree will be generated

**features
simutaneously loading the static resources, execute orderly,
will block other resouce loading
denpendency relationship
the way import static resources

add <style>in to header element to avoid blank blink page
css will block the execution of Javascript, becuase the js code will rewrite the style of the css based on loaded css
javascript will block the rendering process of the page like document.write() change the dom structure

~~~
### Lazy loading && Preloading
~~~
reduce the invalid resource loading

var viewHeight = document.documentElement.clientHeight

function lazyLoad () {
    var eles = document.querySelectorAll('img[data-original][lazyload]')
    Array.prototype.forEach.call(eles, (item, index) => {
        var rect
        if (item.dataset.original === '') return
        rect = item.getBoundingClientRect()

        if (rect.bottom >=0 && rect.top < viewHeight) {
            function() {
                var img = new Image()
                img.src = item.dataset.url
                img.onload = function () {
                    item.src = img.src
                }
                item.removeAttribute('data-original')
                item.removeAttribute('lazyload')
            }()
        }
    })
}

lazyLoad()
document.addEventListener('scroll', lazyLoad)

preload js
~~~

### Repaint and Reflow
~~~
reflow will change the layout of the page
such as top left width height border margin padding display position clear float
repaint will change the style of the page
such as background-color border-style shadow border-radius, opacity, translate

solution
tranform, perspective, video, canvas, flash, translate3D, z-index to create a new image layer to avoid reflow
use opacity to replace visibility

reduce the time get the positon of the element, like get the element offset// document.body.clientHeight
display the element ,so the reflow only execute one
add all style in one class, avoid using mutiple classes
use table as less as possible
~~~

### Browser storage
~~~
cookie, httponly, don't use cookie for cdn which supports static resources
localStorage
features 
5m size, saved in client, designed for browser
sessionStorage
features: maintain the information of form, data will be removed after reloading browser
indexedDB
features: maintain the large quantity structive data, and offline version
service worker
pwa
features: support offline, render optimizaiton, information push, intercept network request, functioning in background
use lighthouse to check the usage rate of pwd

chrome://inspect/#serive-workers
chrome://serviceworker-internals
~~~