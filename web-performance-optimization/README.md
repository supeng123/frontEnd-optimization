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
