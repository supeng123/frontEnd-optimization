### 1.哪种方式不改变数组的情况，拷贝出数组a, 满足b!=a, 例如a为【1，2，3】
~~~
let b = a.slice()
let b = a.concat()
~~~
### 2.http2特点有哪些
~~~
多路复用，头部压缩，服务端推送，请求优先
~~~
### 3.改变a=【1，2，3】成【4，3，2，1】
~~~
a.reverse().unshift(4)
a.push; a.reverse()
~~~
### 4.实现parse
~~~
function parse(obj, path) {
    let temp = JSON.parse(JSON.stringify(obj))
    const directory = path.replace('[', '.').replace(']', '').split('.')
    let key;
    while (key = directory.shift()){
        temp = temp[key]
    }
    return temp || undefined
}
~~~
### 5.分别给#box增加如下样式，节点距离body的上边距为多少
~~~
<body style="margin:0;padding:0">
    <div id="box" style="top:10px;margin:20px 10px"></div>
</body>
1. position:static  20px
2. position:relative 30px
3. position:absolute 30px
4. position:sticky 10px
~~~
### 6.LRU中下面哪所有页面缺页次数是（1，3，2，4，2，3，1，2）
~~~
231 3
423 4
243 4
324 4
132 5
213 5
缺页5次
~~~
### 7.长度为n的单链表连接到长度为m的单链表的时间复杂度
~~~
O(m)
~~~
### 8.下面的数字list中用选择排序第二次交换的结果为【12，15，1，18，2，35，30，11】
~~~
first step 【1，15，12，18，2，35，30，11】
second step【1，2，12，18，15，35，30，11】
~~~
### 9.下面的排序算法，哪个是不稳定的
~~~
冒泡排序
并归排序
插入排序

选择排序 不稳定
快速排序 不稳定
堆排序 不稳定
希尔排序 不稳定
~~~
### 10.js获取父节点
~~~
element.parentNode
~~~
### 11.iterator 
~~~
function iterator(obj) {
    const parsedObj = JSON.stringify(obj)
    const result = []
    if(parsedObj.next) {
        if(parsedObj.next.length>1) {
            result.push(parsedObj.node)
            for(let i = 0; i < parsedObj.next.length; i++) {
                interator(parsedObj.next[i])
            }
        }else {
            interator(parsedObj.next[0])
        }
    }
}
~~~
### 12.DOMContentLoaded和load事件
~~~
DOMContentLoaded事件比load事件更早执行
~~~
### 13.box-sizing的属性
~~~
border-box
content-box
inherit
~~~
### 14.伪类选择器
~~~
:checked
:required
:read-only
:empty
:dir
:lang
:fullscreen
:link
:visited
:hover
:active
:focus
:not
:first-child
:nth-child
:nth-of-type
:only-child
:target
~~~
### 15.伪元素选择器
~~~
::before
::after
::first-letter
::last-line
~~~
### 16. -1 >>> 32
~~~
-1的二进制是 
求一的而二级制 0000 0000 0000 0000 0000 0000 0000 0001
反转 1111 1111 1111 1111 1111 1111 1111 1110
加上一 1111 1111 1111 1111 1111 1111 1111 1111

向右移 32位相当于 32%32 =0 向右移了0位
向右移 34位相当于 34%32 =2 向右移了2位
所以最后结果为 2^32-1
~~~
### 17.[1<2<3,3<2<1]
~~~
1<2为true true隐式转换为1<3， 结果为true
3<2为false, false隐式转换为0<1， 结果为true
~~~
### 18.[1,2,3].map(parseInt)
~~~
parseInt函数只接受两个值，一个是值，一个是几进制转化
parseInt(‘1’, 0) 1
parseInt(‘2’, 1) 没有一进制 NaN
parseInt(‘3’, 2) 没有二进制 NaN


parseInt(‘10’, 0) 10
parseInt(‘10’, 1) 没有一进制 NaN
parseInt(‘10’, 2) 没有二进制 2^0+2^1
parseInt(‘10’, 3) 没有二进制 3^0+3^1
parseInt(‘10’, 4) 没有二进制 4^0+4^1
~~~
### 19.a.__proto_printName(), a.printName()
~~~
function setname(name) {
    this.name = name
}
setname.prototype.printName = function() {
    console.log(this.name)
}

let a = new setname('cc')
a.name = 'dd'
a.__proto__.name='ee'

//ee, dd
~~~
### 20.输出结果
~~~
console.log(1)
setTimeout(()=>{console.log(2)},0)
console.log(3)
Promise.resolve(4).then(b=>console.log(b))
console.log(5)

13542
~~~
### 21.canvas和svg的说法正确的是
~~~
canvas 支持事件处理
canvas 不依赖分辨率，缩放不失真
svg 不依赖分辨率，缩放不失真
svg 适合图像密集型的游戏

3
~~~
### 22.onlick和href谁先触发
~~~
click如果调用触发event.preventDefault(),
href就不支持跳转
所以onclick先触发
~~~
### 23.关于跨域的说法正确的是
~~~
Cookie, LocalStorage, indexDB都有同源策略限制
postMessage, JSONP, websocket是常见的跨域解决方案
跨域资源共享规范除了GET之外的http请求，或者代培MINE的POST请求，浏览器都需要先发一个OPTIONS请求
~~~
### 24.prefetch和preload的区别
~~~
在link标签使用，preload比prefetch的优先级更高，
preload会优先加载本页面所有的资源
prefetch会加载本利资源加载完成之后优先加载其他页面资源
~~~
### 25.css中不支持继承的元素
~~~
font-size
color
margin
cursor

margin
~~~
### 26.样式优先级的排序
~~~
!important 行内样式 id class tag
~~~
### 27.算一下代码中box区域的高度
~~~
transition:一个元素不同状态之间的切换时候定义不同的过渡效果，，如果之前没有高度会瞬间增加

<style type="text/css">
    .area{height: 100px}
    .box{transition: height 1s; background: #000}
</style>
<div class="area">
    <div class="box">
    
    </div>
</div>
<script>
    document.querySelector('.area').addEventListener('click', () => {
        document.querySelector('.box').style.height = '100px'
    })
</script>

高度瞬间从0达到100px
~~~
### 28.哪个方法会影响原数组
~~~
splice
concat
join
slice

splice
~~~
### 29.
~~~
~~~
### 30.节流防抖的说法正确的是
~~~
节流 throtte, 单位时间内多次执行函数，函数只执行一次操作
防抖 debounce， 单位时间内操作多次操作函数， 会重新设置单位时间，直至到了单位时间草能执行函数,全程只执行一次

const debounce = (fn, wait) => {
    let timer;
    return function() {
        const that = this
        const args = arguments
        clearTimeout(timer)
        timer = setTimeout(function(){
            fn.apply(this, arguments)
        }, wait)
    }
}

const throtte = (fn, wait) => {
    let previous = 0
    return function(...args) {
        let self = this
        if (new Date() - previous > wait) {
            previous = new Date()
            fn.apply(this, args)
        }
    }
}

setTimeout(callback, timeout) {
    let start = +new Date()
    let timer
    function loop() {
        timer = window.requestAnimationFrame(loop)
        if (+new Date() - start >= timeout) {
            callback.apply(this, args)
            windows.cancekAnimationFrame(timer)
        }
    }

    window.requestAnimationFrame(loop)
}

在图片按需懒加载场景，用防抖的方式优化加载图片
~~~
### 31.输出结果为
~~~
var a = {}, b = {key: 'b'}, c = {key: 'c'}
a[b] = 'b'
a[c] = 'c'

console.log(a[b]) //c

a[b] ===> b.toString() ===> a['object Object'] = 'b'
a[c] ===> c.toString() ===> a['object Object'] = 'c'
~~~
### 32.null和undefinied的描述
~~~
null 在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零
+null  0
+undefined NaN
JSON.stringify({a: undefined}) {}
JSON.stringify({a: null}) {"a": null}
~~~
### 33.encodeURI && encodeURIComponent
~~~
var url = 'https://www.slogan.com/text.html'
encodeURIComponent(url) //"https%3A%2F%2Fwww.slogan.com%2Ftext.html"
encodeURI(url) //'https://www.slogan.com/text.html'
~~~
### 34.event loop
~~~
const first = () => (
    new Promise((resolve, reject) => {
        console.log(1)
        let p = new Promise((resolve, reject) => {
            console.log(2)
            setTimeout(() => {
                console.log(3)
                resolve(4)
            },0)
            resolve(5)
        })
        resolve(6)
        p.then((arg) => console.log(arg))
    })
)

first().then((arg)=> {
    console.log(arg)
})
console.log(7)

1,2,7,5,6,3
~~~
### 35.哪些请求会发出http请求
~~~
<textarea><img src="pic.jpg" style="display:none"></textarea>
<textarea style="display:none"><img src="pic.jpg" style="visibility:hidden"></textarea>
<div><img background-image:url(pic.jpg) style="display:none"></div> 
<div><span background-image:url(pic.jpg) style="display:none"></span></div>

span is not block level element so the backgrount-image won't be activated
answer is 3
~~~
### 36."113"+25-"50"
~~~
11325-50
answer is 11275
~~~
### 37. var a = "fenqile" 取得n
~~~
a[3] q
a.charAt(2) n
a.substr(2, 2) nq
a.substring(2, 3) n
~~~
### 38.水平垂直居中，左右边距10px, 宽度是高度2倍
~~~
body {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
}

.out {
    background-color: #blue;
    margin: 0 10px;
    width: 100%;
    font-size: 20px;
    text-align: center;
}

.in {
    height: 0;
    // PADDING 相对于高度计算
    padding: 25% 0;
}

<body>
    <div class="out">
        <div class="in">A</div>
    </div>
</body>
~~~
### 39.类数组转换为数组
~~~
Array.from(arguments)
Array.prototype.slice.call(arguments, 0)
[...arguments]
~~~
### 40.空对象数组转换
~~~
if([]==false) {console.log(1)} true [].tostring()===> ''===> false
if({}==false) {console.log(2)} false []].tostring()===> '[object Object]'===> NaN
if([]) {console.log(3)} true
if([1]==[1]) {console.log(3)} false
~~~
### 41.async event loop
~~~
async function async1() {
    console.log('async1 start')
    await async2();
    console.log('async1 stop')
}

async function async2() {
    console.log('async2')
}

console.log('script start')

setTimeOut(function() {
    console.log('setTimeout')
},0)

async1()

new Promise(function(resolve) {
    console.log('promise1')
    resolve()
}).then(function() {
    console.log('promise2')
})
console.log('script end')

script start
async1 start
async2
promise1
script end
async1 stop
promise2
setTimeout
~~~
### 42.设计一个bind函数
~~~
function Animal(name, color) {
    this.name = name;
    this.color = color;
}
Animal.prototype.say = function() {
    return `I'm a ${this.color} ${this.name}`
}
const Cat = Animal.myBind(null, 'cat')
const cat = new Cat('white')
if (cat.say() === `I'm a white cat` && cat instancof Cat && cat instanceOf Animal) {
    consoe.log('succeeded')
}

Function.prototype.myBind = function() {
    let thatFunc = this; //this is Animal
    let bindTo = arguments[0]
    let thatArgs = Array.prototype.slice.call(arguments, 1)

    function Fn() {
        let isNewCall = this instanceof Fn; //是否是new 调用的实例也就是cat,确保调到say方法
        let thisArgs = Array.prototype.slice.call(arguments)
        return thatFunc.apply(isNewCall ? this : bindTo, thatArgs.concat(thisArgs))
    }
    Fn.prototype = Object.create(thatFunc.prototype)
    return Fn
}
~~~
### 43.Object.create原理
~~~
funtion create(obj) {
    let Fn = function () {}
    Fn.prototype = obj
    return new Fn()
}

child.prototype = create(parent.prototype)
~~~
### 44.继承
~~~
funciton Parent() {

}

function Child() {
    Parent.call(this)
}
Child.prototype = create(Parent.prototype)
~~~
### 45.this指向
~~~
let a = function() {this.b = 3}
let c = new a()
let b = 7
a()

b = 3
c.b = 3
~~~

### 46.高阶函数
~~~
const repeatFunc = repeat(alert, 4, 3000)
repeatFunc('hello world')

funtion repeat(func, times, wait) {
    return (...rest) => {
        for (let i = 0; i < times; i ++) {
            setTimeout(() => {
                func(...rest)
            }, wait * i)
        }
    }
}
~~~

### 47.正则表达式匹配1234567890成1,234,567,890
~~~
\B非单词边界
?!l //匹配前面不等于l
?=l //匹配前面等于l
const text= '1234567890'
text.replace(/\B(?=((\d{3})+(?!\d)))/g)
'1234567890'.replace(/\B(?=((\d{3})+(?!\d)))/g, ',')
~~~
### 48.tree shaking原理
~~~
commonjs只有在代码运行时才能确定模块调用
es-module代码静态分析确定模块引入，所以webpack的打包能tree shaking永远不会执行的代码
~~~
### 49.promise all
~~~
function promiseAll(promises) {
    return new Promise((resolve, reject) {
        const container = []
        promises.forEach((promise) => {
            promise.then((result) => {
                container.push(result)
                if (container.length === promises.length) {
                    resolve(container)
                }
            })
            .catch((error) => {
                reject(error)
            })
        })
    })
}
~~~
### 50. deepCopy
~~~
function deepCopy(originObj, map = new WeakMap()) {
    if(isObject(originObj)) {
        if (map.has(originObj)) {
            return map.get(originObj)
        }
        const type = [Date, RegExp, Map, Set, WeakMap, WeakSet]
        if (type.includes(originObj.constructor)) {
            return originObj.contructor(originObj)
        }

        const allProperties = Object.getOwnPropertyDescriptors(originObj)
        const protoTypes = Object.getPrototypeOf(originObj)
        const cloneObj = Object.create(protoTypes, allProperties)

        for (const prop of Reflect.ownKeys(originObj)) {
            cloneObj[prop] = isObject(originObj[prop]) && typeof originObj[prop] !== 'function' ? deepCopy(originObj[prop], map) : originObj[prop];
        }
        return cloneObj
    } else {
        return originObj
    }

    function isObject(obj) {
        return typeof obj === 'object' || typeof obj === 'function' && obj !== null
    }
}
~~~
### 51.实现reduce
~~~
function reduce(callback, initState) {
    const items = this
    let func = callback
    let init = initState

    items.forEach(item => {
        init = func(init, item)
    })
    return init
}
[].reduce(()=> {},{})
~~~
### 52.验证ip地址
~~~
function validIp(address) {
    let v4 = address.split('.')
    let v6 = address.split(':')
    const regIP4 = /^0$|^([1-9]\d{0,2})$/;
    const regIP6 = /^[0-9a-fA-F]{1,4}$/;
    if(arrIp4.length === 4) {
        if(arrIp4.every((item) => regIP4.test(item) && item < 256)) {
            return "IPv4";
        }
    } else if(arrIp6.length === 8) {
        if(arrIp6.every((item) => regIP6.test(item))) {
            return "IPv6";
        }
    } 
    return "Neither";
}
~~~
### 54.js浮点数 0.1+0.2 === 0.3 ？
~~~
No，根据IEEE754标准，两个浮点数相加会将每个浮点数转化为二进制，而二进制是没有这么精确
Math.abs(0.1+0.2-0.3) <= Number.EPSILON
~~~
### 55.js数据类型
~~~
undefine, null, number,string, boolean, symbol, object

Object.prototype.toString.call()
typeOf can’t check null and function
~~~
### 56.css写梯形
~~~
.box {
    width: 50px;
    height: 50px;
    border-top: 50px solid transparent;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 50px solid red;
}
~~~
### 57.清浮动
~~~
父元素后加伪元素：after{display:block, clear:both; content:''}
BFC，父元素添加overflow:hidden

伪类：修饰已在render tree的节点，first-child,hover
伪元素：修饰不在render tree的节点，first-letter,before
~~~
### 59.js中 new发生了什么
~~~
const Obj = {}
Obj.__proto__ == ClassA.prototype
ClassA.call(Obj)
~~~
### 60.async函数设计
~~~
function createTask(ms) {
    return () => {
        console.log('start', ms)
        return new Promise(r => setTimeout(() => {
            console.log('end', ms)
            r(ms)
        }), ms)
    }
}
const tasks = Array(5).fill(null).map((_, i) => createTask(i * 1000))
Promise.all(tasks.map(task => task())).then(console.log)

//the output
'start 0'
'start 1000'
'start 2000'
'start 3000'
'start 4000'
'end 0'
'end 1000'
'end 2000'
'end 3000'
'end 4000'
[0,1000,2000,3000,4000]

function limitRunTask(tasks, limitNumber) {
    let loop = 0
    let resultArr = []
    return runTask(tasks.slice(loop*limitNumber, loop*limitNumber + limitNumber))

    function runTask(tasks) {
        if (!tasks.length) return Promise.resolve(resultArr)
        return Promise.all(tasks.map(task => task()))
        .then((result) => {
            resultArr.push(...result)
            loop ++
            return runTask(loop*limitNumber, loop*limitNumber + limitNumber)
        })
    }
}

class Queue {
    constructor() {
        this.allTasks = []
        this.limitNumber = 1
        this.loop = 0
    }
    task(wait, cb) {
        this.allTasks.push({
            wait,
            cb
        })
        return this;
    }

    start() {
        return this.run(this.allTasks.slice(this.loop * this.limitNumber, this.loop * this.limitNumber + this.limitNumber))
    }

    run(task) {
        var detail = tasks[0]
        if (!detail) {
            this.loop = 0
            return Promise.resolve()
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                detail.cb()
                resolve()
            },detail.wait)
        })
        .then(res => {
            this.loop ++
            return this.run(this.allTasks.slice(this.loop * this.limitNumber, this.loop * this.limitNumber + this.limitNumber))
        })
    }
}
~~~
### 69.大文件断点续传
~~~
document.getElementById('file').addEventListener('change',  async (event) => {
    const file = event.target.file[0]
    const file_name = file.name.split('.')[0]
    let cur = 0, size = 0.5*1024*1024;

    const fileChunkList = []
    while(cur < file.size) {
        fileChunkList.push({
            file: file.slice(cur, cur + size)
        })
        cur += size
    }
    //hash计算
    async calculateHash(fileChunkList) {
        return new Promise(resolve => {
            const worker = new Worker("/hash.js")
            woker.postMessage({fileChunkList})
            woker.onmessage = e => {
                console.log(e.data)
                const {percentage, hash} = e.data
                
                if (hash) {
                    resolve(hash)
                }
            }
        })
    }
    //hash.js
    self.importScripts('/spark-md5.js')
    self.onmessage = e => {
        const {fileChunkList} = e.data
        const spark = new self.SparkMD5.ArrayBuffer()
        let percentage = 0
        let count = 0
        const loadNext = index => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(fileChunkList[index].file);
            reader.onload = e => {
                count ++
                spark.append(e.target.result)
            }
            
            if (count === fileChunkList.length) {
                self.postMessage({
                    percent: 100,
                    hash: spark.end()
                })
                self.close()
            } else {
                percentage += 100/fileChunkList.length
                self.postMessage({
                    percent: percentage
                })
                loadNext(count)
            }
        }
        loadNext(0)
    }
    //文件上传的进度可以用progressEvent.loaded，断点上传是将所有切片的xmlHttpRequest请求保存下来，失败的重传
    //前端预览图片
    const URL = window.URL;
    const objectUrl =  URL.createObjectURL(file)
    const pic = document.getElementById('pic')
    pic.src = objectUrl
    pic.onload = function() {
        URL.revokeObjectURL(objectUrl)
    }

    const requestList = fileChunkList.map(({file}, index) =>{
        const formData = new FormData()
        formData.append("chunk", file)
        formData.append("filename", `${filename}-${index}`)
        return {formData}
    })
    .map(async ({formData}) => {
        return request({
            url: 'http://localhost:3000',
            data: formData
        })

    })

    await Promise.all(requestList)

    const mergeRequest = async () => {
        await request({
            url: 'http://localhost:3001/merge',
            headers: {
                'content-type': "application/json"
            }
        })
    }
})



//服务端
const path = require('path')
const fse = require('fs-extra')

const UPLOAD_DIR = path.resolve(__dirname, ".", "target")
const filename = 'yb'
const filePath = path.resolve(UPLOAD_DIR, "..", `${filename}`)
const mergeFileChunk = async (filePath, filename, size) => {
    const chunkDir = path.resolve(UPLOAD_DIR, filename)
    const chunkPaths = await fse.readdir(chunkDir)

    chunkPaths.sort((a, b) => a.split("-")[1]-b.split("-")[1])
    await Promise.all(
        chunkPaths.map((chunkPath,index) => {
            pipeStream(
                path.resolve(chunkDir, chunkPath)
                fse.createWriteStream(filePath, {
                    start: index * size,
                    end: (index + 1) * size
                })
            )
        })
    )
    fse.rmdirSync(chunkDir)
}
mergeFileChunk(filePath, filename, 0.5*1024*1024)

const pipeStream = (path, writeStream) => {
    new Promise((resolve, reject) => {
        const readStream = fse.createReadStream(path);
        readStream.on("end", () => {
            fse.unlinksync(path)
            resolve()
        })
        readStream.pipe(writeStream)
    })
}


function request({
    url,
    method='POST',
    data,
    headers={}
    requestList
}){
    return new Promise((resolve, reject) => {
        con xhr = new XMLHTTPRequest()
        xhr.open(method, url)
        Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key])
        })
        xhr.send(data)
        xhr.onload = e => {
            resolve({
                e.target.response
            })
        }
    })
}

//服务端
const path = require('path')
const http = require('http')
const fse = require('fs-extra')
const multiparty = require('multiparty')
const server = http.createServer()

const UPLOAD_DIR = path.resolve(__dirname, ".", "target")

server.on("request", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    res.end("hello")

    if (req.url == '/') {
        const multipart = new multiparty.Form()
        multipart.parse(req, async(err, fields, files) => {
            if (err) {
                return
            }

            const [chunk] = files.chunk
            const [filename] = fields.filename

            const dir_name = filename.split('-')[0]
            const chunkDir = path.resolve(UPLOAD_DIR, dir_name)

            if (!fse.existSync(chunkDir)) {
                await fse.mkdirs(chunkDir)
            }
            await fse.move(chunk.path, `${chunkDir}/${filename}`)
        })
    }
})

server.listen(3000, () => {
    console.log('3000 port is on')
})
~~~
### 70.nodejs是单线程吗
~~~
javascript是单线程，事件循环是在主线程之上，每个任务通过事件循环在不同事件被主线程执行，
nodejs是js运行在服务的容器本身是支持多进程和多线程的

require('child-process').fork新的进程解决线程阻塞
const cluster = require('cluster')
const numCpus = require('os').cups().length;
if (cluster.isMaster){// main process
    for(let i = 0; i < numCpus; i++) {
        cluster.fork()
    }
} else {
    http.createServer((req, res) => {
        res.writeHead(200)
        res.end(`hello world ${process.pid}`)
    }).listen(8000)
}
~~~
### 71.TCP&UDP
~~~
TCP&&UDP都是传输层连接协议，Transmission Control Protocol(保证完整)，User Datagram Protocol
ip网络层
数据链路层
物理层

seq = x
seq = y ack = x + 1
seq = x + 1 ack = y + 1
第三次可以携带数据

四次挥手
http1.1 长连接keep-alive,和etag更精确的缓存
http2的功能 （多路复用）就是指一个TCP连接可以同时发送多个HTTP请求， 由于他的传输是（二进制分帧），所有流都有标识符确定内容完整
（头部压缩）（服务端推送）
~~~
### 72.websocket
~~~
他是一个持久化应用层的协议，依赖http但是补充了http的不足
http是无状态的连接协议，每次断开再连接都要和服务端验证三次握手，
websocket通过发送http请求，请求头包括里面包括使用的协议，连接是否升级等内容，连接上后服务端可以
自动通信，不需要客户端轮询，节省带宽减轻服务器压力
~~~
### 73.三角形
~~~
.triangle {
    width: 0px;
    border: 100 solid;
    border-color:(red, transparent, transparent, transparent)
}

//相邻子节点样式修改
ul > li+li {
    border: 1px solid black;
}
~~~

//面包屑导航
~~~
li:first-child:before {
    content: "";
}

li:before {
    content: "\27a5"
}

//outLine

li {
    border: 10px solid pink
}

li+li {
    margin-top: -10px
}

li:hover {
    outline: 10px solid purple;
    outline-offset:-10px
}

~~~
### 74.xss&&csrf&&click hajack
~~~
cross site script
跨站脚本攻击是用不属于本站脚本非法获取本站用户的个人信息cookie
主要有三种类型
反射型 通过用户访问的url，然后服务器不做处理直接返回
存储型 通过提交表单将脚本写入数据库，数据库每次读取数据到前端页面会造成攻击
dom修改型 通过修改页面的dom造成攻击， 如改动innerHTML中带有攻击者的脚本

http only
特殊字符强制转换，
content security policy

cross site request forge
攻击者利用a网站登录的信息在B网站发送一个到a网站的请求

token, samesite, 禁止refer()，验证码
黑客将被攻击的网站放入iframe中，可以在服务端禁止iframe
~~~
### 75.webpack
~~~
//多页面打包需要改的配置
entry,output,htmlWebpackPlugin({filename: "detail.html", template: "./src/index.html", chunks: ["detail"]})

//babel里面配置“useBuiltIns:"usage"”会在打包时打包被项目引用的模块，而没引用的不打包减少包的体积

webpack dev serve ,在dev-server里面配置hot:true开启HMR,但是针对js文件需要自己对各个模块进行处理，比如
有个文件需要做HMR，需要在在引用出加上
module.hot.accept("./number.js", function() {
    console.log("这个文件改动了，请刷新")
})

webpack loader里面是一个文件的content
webpack plugin需要新建一个类，类里面必须包含apply方法，里面会返回一个compiler对象，供开发人员在webpack的不同的构建阶段自定义功能

//DDL提取的是common需要编译的代码
~~~
### 76.访问一个URL的过程和相应的优化
~~~
1.URL 解析 
判断输入的URL是否合法，对URL进行字符编码操作，访问限制，
检查缓存,如果有缓存，先去看cache-control和expired的内容，如果命中，则直接读取缓存，没有会下发一个请求比对(if-none-match,if-last-modified)和服务端
的（etag,last-modified,命中服务端端304跳转，客户端继续使用缓存，不然重新发送资源给客户端
注意： no-cache在浏览器使用缓存前，会往返对比 ETag，如果 ETag 没变，返回 304，则使用缓存， no-store说有内容和代理节点都不使用缓存

2.DNS 查询
浏览器缓存检查域名，没找到通过本地的host文件去查找域名，host找不到继续发送广播DNS服务器去查找域名
优化（dns-prefetch）

3.TCP 连接
拿到域名之后开始尝试建立TCP链接，过程客户端和服务器进行三次握手，连接成功之后客户端会发送http请求包括请求头，协议，内容
4.处理请求
服务器解析客户端传过来的数据，对请求进行处理，然后返回数据
优化（响应资源进行压缩，设置etag,last-modified）
5.相应渲染页面
对服务器发送的数据解压，同时生成dom tree和css tree组成render tree, 生成layout和重绘样式
优化（
1.css 需放在head里，css会阻碍js
2.js放在 DOM 解析后，浏览器会在dom解析完成之后除服DOMContentLoaded事件，defer和async都不阻塞dom渲染，多个async的script的标签会有依赖关系，在dom解析完但是在
DOMContentLoaded事件之前执行，而async没有依赖，没有时间触发的特定时间, document.onload事件是页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了
3.图片压缩，sprint图
4.对未来必须消费的资源进行preload,未来不一定用的到的资源用prefetch
5.减少dom的layout操作，回流造成dom会频繁的构建，影响性能
6.压缩js，css,tree shaking 不会用到的代码
7.大数据进行预加载和懒加载
）
~~~
### 79.JSONP
~~~
function JSONP(url, parameters, key, callback) {
    parameters[key] = 'callbackName'
    window.callbackName = callback
    const data = Object.keys(parameters).map(key => `${key}=${encodeURIComponent(parameters[key])}`).join('&');
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.src = `${url}?${data}`
    document.body.appendChild(script)
}
~~~
### 80.Ajax
~~~
function Ajax(method, url, parameters) {
    return new Promise((resolve, reject) => {
        const data = Object.keys(parameters).map(key => `${key}=${encodeURIComponent(parameters[key])}`).join('&');
        const xhr = new XMLHttpRequest()
        xhr.setRequestHead('Content-type','x-www-form-urlencoded;charset=utf-8')
        xhr.responseType = 'json'
        xhr.withCredential = true
        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyStatus == 4) {
                resolve(xhr.response)
            } else if (xhr.status >= 400) {
                reject()
            }
        }
        
        xhr.open(method, url,true);
        xhr.send(data);
    })
}
~~~
### 90.clientHeight,offsetHeight,scrollHeight && clientTop, offsetTop, scrollTop
~~~
clientHeight = height + padding-top + padding-bottom
offsetheight = height + padding-top + padding-bottom + border-top + border-bottom
scrollHeight = clientHeight

clientTop border-top
offsetTop 元素本身到相对的上一级父元素的距离
scrollTop 滚动条拉动的距离
~~~
### 91.顺序打印promise
~~~
let aaa = [1,2,3]
function sequencePromises(arr) {
    return arr.reduce((total, current)=> {
        return total.then(() => {
           return new Promise((r, j) => {
               setTimeout(() => {
                   r(console.log(current))
               },2000);
           })
        })
    }, Promise.resolve())
}
sequencePromises(aaa)
~~~
### 92.垃圾回收机制
~~~
垃圾回收是回收堆中不再被引用的数据，通过标记空间的算法，从根节点触发遍历所有对象，如果当前对象没有被遍历到会被认为是不可达的数据，然后进行回收处理，由于清理
完成之后内存中存在大量不连续的空间，会对内存做整理，
分代收集，一种为临时对象比如函数内部的申明变量，另一种是长久对象如DOM, window WEB api,
对于引用类型，在没有引用之后会被V8自动回收， 值类型如果在闭包的情况下要等闭包没有引用才会回收，不是闭包会被副垃圾回收新生代中回收
~~~
### 93.图片懒加载
~~~
function lazyLoad() {
    const images = document.getElementByTagName('img')
    const len = images.length

    const documentHeight = window.innerHeight;
    const documentScrollTop = document.documentElement.scrollTop || document.body.scrollTop

    for (let i = 0; i < len; i++) {
        const currentImgHeight = images[i].offsetTop
        if (currentImgHeight < documentHeight + documentScrollTop) {
            image[i].src = imgs[i].getAttribute("data-src")
        }
    }
}
document.addEventListener('scroll', lazyLoad)
~~~

new Promise((resolve, reject) {

})
### 94.promise实现
~~~
class Promise() {
    constructor(fn) {
        resolveList = []
        status = 'pending'
        rejectList = []
        fn(this.resolve.bind(this), this.reject.resolve.bind(this))
    }
    then(scb, fcb) {
        if (scb) {
            this.resolveList.push(scb)
        }
        if (fcb) {
            this.rejectList.push(fcb)
        }
        return this
    }

    catch(cb) {
        if (cb) {
            this.rejectList.push(cb)
        }
        return this
    }

    resolve(data) {
        if (this.status !== 'pending') return
        this.status = 'fulfilled'
        setTimeout(() => {
            this.resolveList.forEach(promise => {
                promise(data)
            })
        })
    }

    reject(error) {
        if (this.status !== 'pending') return
        this.status = 'rejected'
        setTimeout(() => {
            this.rejectList.forEach(promise => {
                promise(error)
            })
        })
    }

    static resolve(data) {
        if (data intanceof Promise) {
            return data
        } else {
            return new Promise((resolve, reject) {
                resolve(data)
            })
        }
    }

    static reject(error) {
        if (error intanceof Promise) {
            return error
        } else {
            return new Promise((resolve, reject) {
                reject(error)
            })
        }
    }
}
~~~
### 95.AMD&&CMD&&CommonJS&&ES6
~~~
AMD&&CMD都是异步的模块加载方案，区别是代码执行时加载模块不同，AMD是依赖前置定义模块时要声明其依赖的模块，CMD是就近依赖，只有用到是才去加载模块
CommonJS&ES6
CommonJS是运行时加载，ES6是静态编译
CommonJS是输出值的拷贝，ES6是输出的值的引用
CommonJS导出是表达式，ES6导出是字符串
CommonJS 中的this是指当前模块，ES6的this是undefined
~~~
### 96.Vue中computed和methods的区别
~~~
1.methods使用时，一般情况需要加括号，而computed则不需要。
2.methods每次调用时会重新执行函数，而computed在其内部变量不变或其返回值不变的情况下多次调用只会执行一次，后续执行时直接从缓存中获取该computed的结果, 它本质上是个getter setter 函数。
~~~
### 97.Event
~~~
function Event() {
    this.events = {}
}
Event.prototype.on = function (type, fn, once = false) {
    if (!this.events[type]) {
        this.events[type] = []
    }
    if (!this.events.type.includes[fn]) {
        this.events.type.push(fn)
        fn.once = once
    }
    return this
}
Event.prototype.off = function (type, fn) {
    if (this.events[type] && !fn) {
        this.events[type] = []
    }
    if (this.events[type] && fn) {
        this.events[type] = this.events[type].filter(f => f !== fn)
    }
    return this
}
Event.prototype.trigger = function (type, data, point = this) {
    if (this.events[type]) {
        this.events[type].forEach(f => {
            f.call(point, data)
            if (f.once) {
                this.off(type, f)
            }
        })
    }
}
Event.prototype.once = function(type, fn) {
    this.on(type, fn, true)
}
~~~
### 98.instanceof
~~~
function instanceof(c, f) {
    let proto = f.prototype
    let c = c.__proto__
    while(true) {
        if (c === null) {
            return false
        }
        if (c === proto) {
            return true
        }
        c = c.__proto__
    }
}
~~~
MAI HANANO780756516
//what I'm saying is that If I have been to over too far in my pursuit of the finer things and cultivating an image
//If I have cuased you some discomfort, It's only an overzealous ex-professional hustler from the mid east trying to erradicate
//unsavory remnants of many hotel rooms I still wake up screamnng over
//and that's what losing a parent is like

the senator was censured by the congressional ethic committee
it makes sense to pay off your credit card balance every month
he wrote this book at the age of twenty
we are out of tissue paper, we have to go buy some
I don't know what to say to make you feel better
several cottages have been isolated by the flood water
the police assembled a lot of evidence against him
prices are double what they were two years ago
I have done bad things that I should be punished for
let's talk over a cup of tea shall we?
If I had taken the plane, I would be dead now

it was not until I reached home that I missed my purse
a bicycle will rust if you leave it in the rain
it is cruel of him to say such thing to her
this place has a mysterious atmosphere to it
the truth is that nothing is toally true or false
you should look after the children from time to time
the old church on the hill dates back to the twelfth century
I am not as stupid as you think I am
let me give you lift as far as the station
my son is now as tall as I am
let's go and see as many things as we can
more money in education will spur economic growth
the crane, unlike the dog, has never dreamed of flying
the end does not alway justify the means
I'd like to find out why she said so
scientists can easily compute the distance between planets
that's the computer on which he writes his articles
he sleeps during the day and works at night
you've both been impressive today,
how large is the polulation of new york city

whe she saw that they had no school, she started one

the date of the festival coincides with that of the exam

the river was flooded by the heavy rain

it is llke looking for a needle in haystack
take you hat off when you enter a house of worship
i d like to ask you a few more questions
I agree with what you say to some extend
the internet is an invaluable source of information
a fire broke out in my neighborhood last night
the book sitting next to me spoke to me
the boss has a good opinion of your work, 高评价
you get a most head start on most kids 
you know the shitty thing about all of this is that the strange behind the counter gave me the free chenno that small act of kindness showed more compassion than my mother gave me her entire goddamn lifeAKA031CAVI
we need to make it clear that abusing, stalking,in any way bothering your mom ever again will be more trouble than it's worth
it is more blessed to give than to recieve(赠与比接受更让人觉得幸福)
it is less muggy today than it was yesterday.
his absence gave birth to all sorts of rumors
I can do with it as I fucking please
judging from the looks of sky, it may rain this afternoon
ebola spreads from person to person through bodily fluids
I don't know what am going to do next
I thought you would be full after eating that big steak
I am going to ran a couple errands, wanna tag along
my fater will often read newspapers during meals
I don't feel like taking a walk this morning
she boughts six yards of cloth for a dress 
I always rely on him in times of trouble
it is sometime difficult to make yourself understood in public
Tsunamis swept through rice fields and flooded the towns
we lost sight of the me in the crowd
we all thought your idea to be impratical
we were astonished hear what had happened
some of them are healthy, but other are not
you should try to form a habit of using your dictionaries
she was dolled up for her big days
how long does it take to walk to the station
If i were in your position, i wll lend hime a hand

there must be a way to arrive at a diplomatic solution
I had hoped that my mom would live until I got married
I got up early enough to catch the first train
if he is innocent, it follows that his wife is guilty
the old houses were torn down to make a room for a supermarket
the town was destroyed by the flood after the storm
she waved her hand until the train was out of sight
a caged cricket eat just as much as a free cricket
a blast of cold air swept through the house
he amassed a fortune in the stock trading during the last boom
his mother sat up all night waiting for her son
I wonder why they left my name off the list


No sooner had we just finished working one tough problem than our boss sent us another straight from the top
you have not fallen in love have you, I wont have it, haing that man become my brother-in-law, I absolutely hate that
his boosterism makes it sound wonderful, but I wonder if he understands how hard it is going to be to actually carry out
if it had not been that lucky and his knowledge of flying, he could never have succeeded in crossing the atlantic
the gills of the fish are bright red is because there are many capillary vessels collected there, the same as for lungs(肺也一样)
his utter failture at his last peace conference has taught hime to arm himself to the teeth with tricks and tactics
I would like to say a word of thanks to all gentalman and ladies whoes care I have been in
if you are having a temporary finiacial problems and it is the cause of you outstanding account, let me know about it
the fact become self evident if you look at the relation between the theme and those leading research on it.
Frank has been workingon the graveyard shift the past month so he has not been able to see any of his friends who work normal hours
but it did not stop himself from using his mind and presenting his ideas at physical meetings around world
If I going to have wedding ceremony, i want it to be the best ever so I wont have regrets
perception is based , to a very large extend, on conceptual models, which are always inadequate, oftern incomplete amd sometimes profoundly wrong
I stop worrying about it and take some actions, the anxiety that comes from doing nothing is worse than the danger you might face
working and healthy people comtribute to the reduction of medical expenses, the rise of the eligible age for benefits and curtailment of cost
since her parents were busy at work all the time, she spent lot of time at her friends house
I just got a great job beacuase of the introduction from my friend, sometimes things happen whn you least expext it.
Mrs Mico swam from Dove on the english side to France in 8 hours and 58 minutes then turned around and returned to England
howver as living standards gradually came to rise, more and more people begain to have thier own bathroom at home
this is the first time I work as a coordinator, so I might not have the hang of it yeat
wood is a disappearing resource in much Africa, and these stoves burn far less wood than the stoves currently in much use(目前大量使用的炉子)
pets loss refers to the reactions of shock and anger that occur in owners who has been bereaved(死者的亲友) of their pets
that is to say, a language is something we learn and are taught, not something we know by instinct
the dining hall is directly adjencent to the lobby, or rather, from where you are, it's just three steps away
it was believed that, the success of the crops depended on the way the players threw or kicked the ball during the game
what I noticed most about my Canadian high school was the great respect shown by students toward their teacheres
but she had not expected to cross an ocean, enter a new and romantic-sounding country, and find herself in exactly the same position
the greatest course of stress for men is work, while for women, human relationship comes at the top of the list
you have to think about the example you are setting, you will never be able to lead if you don't set an example worth following
I alway buy english language books I come cross at book store, but since I never read them, all they do is pile up
if you lisence exceeded its validity period, you can be issued with a new license in the following way
the stories which you will read in this book deal with some of the problems which face young people
there was,however, a need for food to be carried from bowl to mouth, and chopsticks came along to meet the need
at the risk of sticking my neck out, I think if we do that, we are making a big mistake
the command of communication skills in multiple language is essential to any company providing goods and services on the world market
since the first appearance on earth, men have gathered information and have attempted to pass the useful ideas to other men 
a man who angers easily should learn to count to ten
several years ago, in the course of being interviewed for a job, I was introduced to competitor for the position
Tony realized that if he hired another crew, got more customers and did the job quicker and sloppier, he could make more money
when you start taking medicine, it begins working on symptoms,like pain,right away, but that does not mean that ulcer heals right away

he's likely to be later, you 'd better tell him agin the meeting time is 7 to make double sure
the precision ratio is an index that indicates how many meet search criteria out of all articles retrieved
the book aims to provide an explaintion of modorn Japanese grammar that is as systematic and as easily understand as possible
Today's agenda concerns the re-electiom of the student council, If anybody wishes to stand as a candidate, please raise you hand
it is only when i can sleep at night that the ticking of the clock become loudy enough to bother me
sales at the compamy zoomed thanks to the brisk export demand, but profit did not keep up because of the intense competition
if you have a bone to pick with a person, you need to tell it to his face instead of saying things behind his back
I 'd like to address that it is more convenient to control tariffs as a bloc rather than country by comtrol
at his final examl, Bob was really put through the wringer, the test covered everything that was in the course
despite a large surplus in merchandise trade, the current account surplus is not so big due to a deficit in invisible trade
I think against somebody like that, my seemingly clever techniques would be seen through and then I would be defeated
I am sure more flags were burned as a result of Congress passing that law than had ever been burned before

the launch which had been schedualed for this morning was postponed becuase of the illness of commander
In the evening I went out on safari again, at night I felt asleep hearing the grunting of the hippos
if you whip the steering wheel around like that on the snowy road, the car is going to go into a slide
the met with such violent opposition that they backed down(退缩)
what you don't see and hear with your own eyes and ears might be true, but it might also not be true
the diffculties of Japanese language prevent all but a handful of foreigners from approaching the literature in the original.
I feel smart today, to a degree that is the proportion to the amount of good rest I had yesterday
Inverting money in your home has some merit,when it is time to sell it yu can get more money
I had words with the manage of that store, because he refused to refund my money for the TV set that was not operating properly
I'm patching things up for your mistake so it's only natural that I get a reward appropriate to my labours
After the hatched job my boss id after my proposal, I'm not sure how long I want to keep on working here
if the tendencies continue, those aged 65 or more will account for the a quarter of the population within 30 years
there is no more dangerous experiment than trying to be one thing before man's face and another behind his back
the basis of this system is the students must take turns in teaching, they have to help each other
Career opportunities, flex-time, satellite-offices, and more childcare facilities are required to make women at home join the work force
when bears sleep or lie down, their postures depend on whether they want to get rid of heat or conserve it
a buyers market is a market in which goods are plentiful, buyers have a wide range of choices, and prices are low
### 129.不同二叉搜索树
~~~
//leetcode 95
//递归
function differentTrees(n) {
    if (n === 0) return []
    return generateTree(1, n)

    function generateTree(start, end) {
        const res = []
        if (start > end) return [null]
        for(let i = start; i <= end; i++) {
            let leftTree = generateTree(start, i-1)
            let rightTree = generateTree(i+1, end)

            for (let lNode of leftTree) {
                for (let rNode of rightTree) {
                    const cur = new TreeNode(i)
                    cur.left = lNode
                    cur.right = rNode
                    res.push(cur)
                }
            }
        }
        return res
    }
}
~~~
### 150.最长同值路径
~~~
后序遍历
function maxPath(root) {
    function inorder(node) {
        if (node === null) return ;
        inorder(node.left);
        ans = Math.max(
            ans, 
            findRoad(node.left, node.val) + findRoad(node.right, node.val)
        );
        inorder(node.right);
    }
    
    // 返回当前节点的最大同值子树的路径数
    function findRoad(node, val) {
        if (node === null || node.val !== val) return 0;
        let left = findRoad(node.left, val);
        let  right = findRoad(node.right, val);
        return Math.max(left, right) + 1;
    }
    
    let ans = 0;
    inorder( root );
    return ans;
}
~~~

I definitely won't go out of my way to be nice to you again 我绝对不会再对你好了
ithink it's best if we keep moving forwaring with our lives
少年鸭的奇幻漂流
    去年年末，我叔准备年货将自己去年在江北喂养的鸭和鸡带回老家，当时大家觉得直接杀掉放在冰箱吃起来不新鲜，而院子门经常打开加上天气也比较冷所以最后决定圈养
在他家空置的楼顶，等合适的时候再处置。
    几天之后，村子开始封闭，村中集市上的蔬菜和日用品由于逐渐开始短缺慢慢涨价，多数村民虽然自家种一点蔬菜和养殖家禽，但也不得不做好物资短缺的准备，顶楼
上的家禽也一天一天的减少。
    二月份时，楼上只剩下一只鸡和一只鸭，我妈和堂妹几个人觉得腻味决定谁想吃自己去上楼动手，可没想到我们这些人都是只想饱口腹之欲没胆动刀的人，到最后只是隔三差五的
上楼喂食，一时间既然忘记楼上还有活物，直到有一天一只鸡因为太饿逃到楼下去找食物，我们也只是抓住后放回楼上然后再喂点食物。由于大家都没在意投食时间，所以这只鸡逃出来的
的次数越来越多，它有时遛进堂妹二楼的客厅，有时闯进楼下后院的厨房，有时在楼梯间踱步徘徊... 我记得它最后一天逃出了堂妹家，不知怎么进入了我家，上了楼梯和我弟的房间，
可能因为串稀，（后面是我的猜想）留下它的鄙视(take my shit),我的房间因为门掩的比较严实得以幸免，它走到了二楼后的阳台然后前方的油菜花田飞了出去。当天晚饭的时候我妈
说楼梯和我弟的房间发现了鸡的大便，让人瞧瞧鸡还在不在楼上，检查完之后果然只看见一只瘦鸭子。那只鸡不知怎么回事似乎为了炫耀既然在遛回到了门前，这次大家没了以往的克制，
一群人在左追右堵后终于它第二天早上被端上餐桌。
    三月初气温开始回升，大家想到还有一只鸭子一直在楼上没人管，决定让我上楼捉下来到院子里喂养，那只瘦鸭被我五花大绑到后院然后我妈用一根长绳系住它的一直脚，另一端系在
我叔喂养的狗的对面一颗小树上，可能因为瘦我们一直给与鸭子更多的关注，所以狗特别不高兴，一直对它嚷嚷，几天下来鸭一直不吃任何东西可能被狗吼抑郁了，那天它两脚往后一瞪闪
进了下水道。我发现树旁边看不到鸭的身影，然后下水道传来翅膀的扑通声，我妈也赶过来提起绳子把它拽了出来，现在它身上布满污垢，我想无论如何没人会想对它的肉有半分恋想。我妈把它
提进一个注满水的大缸里，用水泼掉它身上的污垢，然后将它放到一边，可能因为天气他冷，而鸭的羽毛全部浸湿，它浑身发抖慢慢地瘫倒在地。我妈看情况不妙如果羽毛一直这么湿冷，它活不过
今晚，于是提议想办法将它毛烘干。其妙的事是这样，我们将它带到浴室，先给这只鸭用沐浴露洗一遍全身，用热水冲干净，然后拿来电吹风对着它一顿猛吹，大概弄了二十多分钟后，它不再挣扎。
我们把它放在浴室中把取暖的浴霸全打开然后走开，几个小时后我再进去时，它站了起来。
    后来我们商量把它放在我们后院，这次没有用绳子系住它，它可以在后院给它腾置出来的空间自由活动，天气热的时候我妈给它挖了一个坑然后用一个盆装满水，它绕着盆边先迟疑一会，然后心安理得
的跳下盆中冲洗它的翅膀。日子一天一天过去，我有时把电脑带到后院上班，看它比之前更大胆的走动，有时候我们开玩笑再到处大便就把你炖了，隔壁阿姨也时不时的问你们还要养它多久，我堂妹说反正
我不喜欢吃鸭肉。
    四月返回工作地，和大家通话的期间我问我妈那只鸭子最后怎么了，我妈说那只鸭子现在还在后院已经生了几个蛋，没人想吃可能会带回江北。
    今天和堂妹聊到她因为疫情还在家不能返回学校，我们聊到年初种的几颗果树，那颗橘子树已经开始开花，另外两颗水土不服没能活下来，那只鸭子后来因为怕无人照管被带到我堂妹的舅妈家，但第二天
只在菜园看到过它。
~~~

《隐秘的角落》里面的无论成年人和小孩，受害者和被受害人，每个角色都在说谎，每个人都试图用谎言去填补由于缺乏最亲近的人的关爱的空缺。里面的小孩和《何处为家》的Zain一样，都被抛弃到需要在拯救他人和杀人者同谋之间
界限暧昧但做出自己抉择的道德困境。剧情灰色主调沉闷但结局没有《大象席地而坐》那般压抑，剧情中隐秘罪恶的推敲也没《阳光普照》警慎，张东升也没《老无所依》和《杀死伊芙》般变态的令人不寒而栗。整个剧情只是一群普通人沉溺自身幻想世界却不幸崩塌的偏执反抗，如同现在的我不懂为啥早上点的外卖现在还没送到，客服，外卖小哥不懂为啥我还不取消订单一样。

不好意思啊，这个忙我帮不了啊，我父母过几个月准备把老家里的房出掉到荆州去看房子，到时候还得用我的信用担保去银行贷款。

不能露天撸串的城市不值得停留
本以为终于可以换各种姿势点外卖，手机打开美团发现小镇没有外卖，顿时傻了，只能自己瞎逛找餐厅。今早被房东叫过去吃完早餐，然后又把我送到指定地点教我怎么打车去蝴蝶泉。在里面逛了一圈出来然后坐车原路返回，料想今天该不会一无所获吧，小镇的交通靠走或者坐车我是不会想再重复了。正当自己想去吃点早上对门在这里定居编辑给我推荐的餐厅，发现每个地方都有点远，共享单车似乎抛弃了这个地方，但突然路口的一排电动车让我有了想法，尽管以前没骑过电瓶车，我还是一下子按着骑自行车的套路无师自通了，这突然出现的坐骑让我对找餐厅的产生了动力，另外饭后在田间，白族民居小道飞奔的快感又让我冲向洱海边，只是这边海边有些地方还在开发走了半个小时前方就被保安挡住了，带着不想再原路返回的冲动又临时调整方向去大理古城。果然和中国任何的古城都一样，或者说任何地方只要带着好玩的期许就注定会落空，悻悻回家休息，待到天黑准备出去吃点东西，小镇古城白日的喧嚣被沉默的夜色代替，视野由于没有路灯但月亮够亮依旧能辨认飘过云层轮廓，在巷子角落飘来的油烟和影影绰绰灯光让撸串的情绪倍增，回家的路上耳边我想我真是来对了地方。
--------来这没两天不知第几回因为头发被人弄错性别了，早上蝴蝶泉的白族婆婆拿着两张白族女生服饰的照片硬要我挑件衣服拍一张，小镇的阿姨跟在我后面一个劲地说我头发扎上她盘的彩色辫子一定很好看，餐厅的老板娘一边收拾桌子一边客气的对我说您好美女帮你换一杯茶吧，更过分的是大理古城的保洁大叔，我明明看到男厕所的标识正准备走进去，他呵斥我上二楼去，等我上楼看见一女生正走出来，我心里一万个cnm，现在还忘不了大叔看我直奔他身后小便池解裤子那惊恐的眼神。

console.log(1)
DNQVND2UJCLF
美倉あやみ
new Promise((resolve, reject) => {
    console.log(2)
    resolve()
}).then(() => {
    console.log(5)
    return 5
    }).then(() => {
    console.log(7)
    })

setTimeout(() => {
    console.log(9);
    Promise.resolve().then(() => console.log(11))
    console.log(10);
},0)

setTimeout(() => {
    console.log(12);
    Promise.resolve().then(() => console.log(14))
    console.log(13);
})

new Promise((resolve, reject) => {
    console.log(3)
    resolve()
}).then(() => {
    console.log(6)
    return 5
    }).then(() => {
    console.log(8)
    })

console.log(4)