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
### 29.哪个方法会影响原数组
~~~
splice
concat
join
slice

splice
~~~
### 30.节流防抖的说法正确的是
~~~
节流 throtte, 单位时间内多次执行函数，函数只执行一次操作
防抖 debounce， 单位时间内操作多次操作函数， 会重新设置单位时间，直至到了单位时间草能执行函数

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
var a = function() {this.b = 3}
var c = new a()
var b = 7
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
### 50.
~~~

~~~
### 51.移除s1所有包含s2的字符
~~~
function remove(s1, s2) {
    for (let i = 0; i < s2.length; i++) {
        s1 = s1.replace(s[2], '')
    }
    return s1
}
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
### 53.最大连续子序列
~~~
function maxSubArray(numbers) {
    let max = - Number.MAX_VALUE
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (sum < 0) {
            sum = numbers[i]
        } else {
            sum += numbers[i]
        }
        if (sum > max) {
            max = sum
        }
    }
    return max
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
### 57.
~~~
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
### 61.
~~~
~~~
### 61.找到重复字符并分组
~~~
function groupSubString(s) {
    let hash = {}
    for (let str of s) {
        let key = [...str].sort().join('')
        if (hash[str] ===  undefinied) hash[key]=[]
        hash[key].push(str)
    }
    return Object.keys(hash).map(key => hash[key])
}
~~~
### 62.区间合并
~~~
function mergeBlock(arrayList) {
    if (!arrayList.length) return []
    arrayList.sort((a,b) => a[0] - b[0])
    const mergedList = [arrayList[0]]
    for (let i = 1 ; i < arrayList.length; i ++) {
        let currentBlock = arrayList[i];
        let position = mergeList.length - 1
        if (currentBlock[0] <= mergedList[position][1]) {
            if (currentBlock[1] > mergedList[position][1]) {
                mergedList[position][1] = currentBlock[1]
            }
        } else {
            mergedList.push(currentBlock)
        }
    }
    return mergeList
}

function mergeBlock(arrayList) {
    if (!arrayList.length) return []
    arrayList.sort((a,b) => a[0] - b[0])
    const mergedList = []
    const current = arrayList[0]
    for (let list of arrayList) {
        if (current[1] >= list[0]) {
            current[1] = Math.max(current[1], list[1])
        } else {
            mergedList.push(list)
            current = list
        }
    }
    if (current.length !== 0) {
        mergeList.push(current)
    }
   
    return mergeList
}
~~~
### 63.验证平衡二叉树是否是按顺序排列
~~~
function isValidOrderTree(root) {
    cont inOrderList = []
    function inOrder(node) {
        if (!node) return;
        inOrder(node.left)
        inOrderList.push(node.value)
        inOrder(node.right)
    }

    inOrder(root)

    for (let i = 0; i < inOrderList.length; i++) {
        if (inOrderList[i] > inOrderList[i + 1]) {
            return false
        }
    }
    return true
}
~~~
### 64.二叉树交换
~~~
function swapBinaryTree(root) {
    function walk(node) {
        if (!node) return
        [node.left, node.right] = [node.right, node.left]
        walk(node.left)
        walk(node.right)
    }
    return walk(root)
}
~~~
### 65.二叉树最大最小深度
~~~
function maxDepth(root) {
    if (!root) return 0
    let lDepth = maxDepth(root.left)
    let rDepth = maxDepth(root.right)
    return Math.max(lDepth, rDepth) + 1
}

function minDepth(root) {
    if (!root) return 0
    let lDepth = minDepth(root.left)
    let rDepth = minDepth(root.right)
    if (!root.left || !root.right) return Math.max(lDepth, rDepth) + 1
    return Math.min(lDepth, rDepth) + 1
}
~~~
### 66.从前序遍历和中序遍历的节点集合中构造一个binaryTree
~~~
//preOrder root left right(root/left/right)
    3
   / \
  9   20
    /   \
   15    7
//preorder = [3,9,20,15,7]
//inorder = [9,3,15,20,7]
function createTree(preOrder, inOrder) {
    if(!preOrder.length || !post.length) return null
    let rootValue = preOrder[0]
    let root = new TreeNode(rootValue)

    let index = inOrder.findIndex(item => item === rootValue)

    root.left = createTree(preOrder.slice(1, index + 1), inOrder.slice(0, index))
    root.right = createTree(preOrder.slice(index + 1), inOrder.slice(index + 1))
    return root
}

      1
     /  \
    2    3
   / \  / \
  4   5 6  7
//preorder = [1,2,4,5,3,6,7]
//postOrder = [4,5,2,6,7,3,1]
function createTree(preOrder, postOrder) {
    if(!preOrder.length || !post.length) return null
    let rootValue = preOrder[0]
    let root = new TreeNode(rootValue)

    let index = postOrder.findIndex(item => item === preOrder[1])

    root.left = createTree(preOrder.slice(1, index + 2), postOrder.slice(0, index+1))
    root.right = createTree(preOrder.slice(index + 2), postOrder.slice(index + 1, postOrder.length - 1))
    return root
}
~~~
### 67
~~~
~~~
### 68
~~~
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
~~~
### 76.按k进行链表翻转
~~~
function reverseKLinkedList(head, k) {
    if (!head.next) return head
    let a = head;
    let b = head;
    let index = 0
    while (index < k) {
        index++
        if (!b) return head;
        b = b.next
    }
    let headNode = reverse(a, b)
    a.next = reverseKLinkedList(b, k)
    return headNode;

    function reverse(a, b) {
        let current = a
        let pre = null
        while (current != b) {
            let next = current.next
            current.next = pre
            pre = current 
            current = next
        }
        return pre
    }
}
~~~
### 93.LRU
~~~
function LRU() {
    constructor(capacity) {
        this.contanier = new Map()
        this.capacity = capacity
    }

    get(key){
        if(this.container.has(key)) {
            const item = this.container.get(key)
            this.container.delete(key)
            this.container.set(key, item)
            return item
        }
        return -1
    }

    put(key, value){
        if (this.container.has(key)) {
            this.container.delete(key)
        }
        if (this.container.size >= capacity) {
            this.container.delete(this.container.keys().next().value)
        }
        this.container.set(key,value)
    }
}
~~~
### 125.DNA重复查找
~~~
//固定窗口
function groupDNA(s){
    const result = []
    const map = new Map()
    let len = s.length
    let start = 0
    let end = 10
    while (end <= len) {
        const str = s.substring(start, end)
        if (map.has(str)) {
            map.set(str, map.get(str) + 1)
        } else {
            map.set(str, 1)
        }
        start++
        end++
    }
    for (let[key, value] of map) {
        if(value > 1) {
            result.push(key)
        }
    }
    return result
}
//what I'm saying is that If I have been to over too far in my pursuit of the finer things and cultivating an image
//If I have cuased you some discomfort, It's only an overzealous ex-professional hustler from the mid east trying to erradicate
//unsavory remnants of many hotel rooms I still wake up screamnng over
//and that's what losing a parent is like
~~~

### 127.三数最近
~~~
function threeSum(arr, target) {
    arr.sort((a, b) => a - b)
    let result = arr[0] + arr[1] + arr[2]
    for (let i = 0; i < arr.length - 2; i++) {
        let start = i + 1
        let end = arr.length - 1
        while (start < end) {
            const sum = arr[i] + arr[start] + arr[end]
            if (Math.abs(target-sum) < Math.abs(target - result)) {
                result = sum
            }
            if (sum < target) start++
            if (sum > target) end--
            if （sum = taregt) {
                result = sum
                break
            }
        }
    }
    return result
}
~~~
### 128.搜索插入位置
~~~
//二分搜索
function insertionIndex(arr, target) {
    let left = 0
    let right = arr.length
    let mid = (right + left) >>> 1
    while (left < right) {
        if (arr[mid] < target) {
            left = mid + 1
        } else {
            right = mid
        }
    }
    return left
}
~~~
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
### 130.对称二叉搜索树
~~~
//递归
function symmetryTree(root) {
    if (!root) return true
    
    function isSymmetry(left, right) {
        if (left === null && right === null) return true
        if (left === null || right === null) return false
        if (left.val !== right.val) return false
        return isSymmetry(left.left, right.right) && (left.right, right.left)
    }
    return isSymmetry(root.left, root.right)
}
~~~
### 131.下一个排列
~~~
//递归
function symmetryTree(nums) {
    if (nums.length < 2) return nums
    let pre = nums.length - 2
    let end = nums.length - 1
    let next = nums.length - 

    while (nums[pre] >= nums[next]) {
        pre--
        next--
    }
    if (pre < 0) return nums.reverse()
    while (pre < end && num[pre] > nums[end]) {
        end--
    }
    [nums[pre], nums[end]] = [nums[end], nums[pre]]

    for (let l = nums.length -1 ; next < l; ++next , --l) {
        [nums[next], nums[l]] = [nums[l], nums[next]]
    }
    return nums
}
~~~
### 133.链表交换节点
~~~
//递归
function exchangeNode(head) {
    if(!head || !head.next) return head
    let dummyNode = {
        next: head
    }
    let cur = dummyNode
    while (cur.next && cur.next.next) {
        let startNode = cur.next
        let endNode = cur.next.next

        dummyNode.next = endNode
        startNode.next = endNode.next
        endNode.next = startNode

        cur = startNode
    }
    return dummyNode.next
}
~~~
### 134.查找数组里面最后和第一个位置
~~~
//二分查找
function findPosition(arr, target) {
    let start = 0
    let end = arr.length - 1
    let mid
    while (left <= right) {
        mid = (left+right) >> 1
        if (arr[mid] === target) break
        if (arr[mid] > target) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    if (left > right) return [-1,-1]
    let i = mid
    let j = mid
    while (arr[i] == arr[i-1]) i--
    while (arr[j] == arr[j+1]) j++

    return [i, j]
}
~~~
### 136.合并数组
~~~
//双指针
function mergeTwoList(nums1, m, nums2, n) {
    const count = m + n
    while (m > 0 && n > 0) {
        nums1[--count] = nums1[m-1] > nums2[n-1] ? nums1[--m] : nums2[--n]
    }
    if (n > 0) {
        nums1.splice(0, n, ...nums2.slice(0, n))
    }
}
~~~
### 140.最长上升子序列
~~~
//动态规划
function lengthzOfLIS(nums) {
    let len = nums.length
    if (len === 0) return 0
    let max = 0
    const dp = new Array(len).fill(1)
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j]+1)
            }
        }
        max = Math.max(max, dp[i])
    }
    return max
}
~~~
### 141.零钱兑换
~~~
//动态规划
function lengthzOfLIS(coins, num) {
    const dp = new Array(len+1).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i < num; i++) {
        for (let coin of coins) {
            if (i - coin < 0) continue
            dp[i] = Math.min(dp[i], dp[i-coin]+1)
        }
    }
    return dp[num] === Infinity ? -1 : dp[num]
}
~~~
### 142.单词拆分
~~~
//动态规划
function lengthzOfLIS(s, arrList) {
    const len = s.length
    const dp = new Array(len+1).fill(false)
    dp[0] = true
    for (let i = 1; i <= num; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && arrList.includes(s.substring(j, i))) {
                dp[i] = true
                break
            }
        }
    }
    return dp[len]
}
~~~
### 142.整数拆分
~~~
//动态规划
function lengthzOfLIS(n) {
    const dp = new Array(n+1).fill(1)
    for (let i = 1; i <= num; i++) {
        for (let j = 0; j < i; j++) {
            dp[i] = Math.max(dp[i], j*(i-j), j*dp[i-j])
            }
        }
    }
    return dp[n]
}
~~~
### 143.最大正方形
~~~
//动态规划
function maxSquare(matrix) {
    if (!matrix || !matrix[0]) return 0
    let row = matrix.length
    let column = matrix[0].length
    let max = 0
    const dp = new Array(n+1).fill('').map(()=> new Array(n+1).fill(0))
    for (let i = 1; i < row; i++) {
        for (let j = 0; j < column; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 1
            } else {
                dp[i][j] = Math.min(dp[i-1][j-1], dp[i][j-1], dp[i-1][j]) + 1
            }
            max = Math.max(max, dp[i][j])
            }
        }
    }
    return Math.pow(max,2)
}
~~~
### 144.回文子串
~~~
//动态规划
function countSubstrings(s) {
    const dp = new Array(s.length).fill('').map(() => new Array(s.length))
    let num = 0
    dp[0] = true
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (s[i] == s[j] && ( i- j < 2 || dp[i-1][j+1])) {
                dp[i][j] = true
                num++
            }
        }
    }
    return num
}
~~~
### 145.平衡二叉树
~~~
//递归
function balanceTree(root) {
    if (!root) return true

    function height(node) {
        if (!node) return 0
        return Math.max(height(node.left), height(node.right)) + 1

    }
    return Math.abs(height(root.left) - height(root.right)) < 2 && balance(root.left) && balance(root.right)
}
~~~
### 146.接水
~~~
//
function catchWater(height) {
    if (height.length === 0) return 0
    let count = 0
    let max = 0
    const leftMax = []
    const rightMax = []

    for (let i = 0; i < height.length; i++) {
        leftMax[i] = max = Math.max(height[i], max)
    }
    max = 0
    for (let j = height.length - 1; j >=0 ; j--) {
        rightMax[j] = max = Math.max(height[j], max)
    }

    for (let i = 0; i < height.length; i++) {
        count = count + Math.min(leftMax[i], rightMax[i]) - height[i]
    }
    return count
}
~~~
### 148.机器人的活动范围
~~~
function movingCount(m, n, k) {
//dfs
    const set = new Set()
    let r = 0
    let c = 0
    let count = 0

    dfs(0, 0)
    return count;
    function dfs(row, column) {
        if (row < 0 || 
            column < 0 || 
            row >= m || 
            column >= n || 
            sum(row) + sum(column) > k ||
            set.has(`${row} + ${column}`)
            ) return
        set.add(`${row} + ${column}`)
        count++
        dfs(row - 1, column)
        dfs(row + 1, column)
        dfs(row, column - 1)
        dfs(row, column + 1)
    }

    function sum(number) {
        return number.toString().split('').reduce((total, a) => {
            return total += Number(a)
        },0)
    }
};
~~~
### 149.二叉树最大路径和
~~~
function maxPath(root) {
    let max = -Infinite

    function help(node) {
        if (node == null) return 0
        let leftVal = Math.max(help(node.left), 0)
        let rightVal = Math.max(help(node.right), 0)
        let newPath = node.val + leftVal + rightVal
        max = Math.max(newPath, max)
        return node.val + Math.max(leftVal, rightVal)
    }
    help(root)
    return max
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
### 151.最长的单词
~~~
function longestWord(words) {
    words.sort()
    const map = new Map()
    map.set('', true)
    let maxWords = ''
    for (let item of words) {
        if (map.has(item.substr(0, item.length - 1))){
            map.set(item, true)
            maxWords = item.length > maxWords.length ? item: maxWords
        }
    }
    return maxWords
}
~~~
### 152.滑动窗口最大值
~~~
//单调队列
var maxSlidingWindow = function(nums, k) {
    const res = []
    let window = new Window()
    for (let i = 0 ; i < nums.length; i++) {
        if (i < k - 1) {
            window.push(nums[i])
        } else {
            window.push(nums[i])
            res.push(window.max())
            window.pop(nums[i-k+1])
        }
    }
    return res
};

class Window {
    constructor() {
        this.data = []
    }

    push(val) {
        while(this.data.length > 0 && this.data[this.data.length - 1] < val) {
            this.data.pop()
        }
        this.data.push(val)
    }

    pop(val) {
        if (this.data.length > 0 && this.data[0] == val) {
            this.data.shift()
        }
    }

    max() {
        return this.data[0]
    }

}
~~~
### 153.删除二叉树节点
~~~
function deleteNode(root, key) {
    if (!root) return null
    if (key < root.val) {
        root.left = deleteNode(root.left, key) 
    } else if (key > root.val){
        root.right = deleteNode(root.right, key)
    } else {
        if (root.left == null && root.right == null) {
            root = null
        } else if (root.right){
            root.val = successor(root)
            root.right = deleteNode(root.right, root.val)
        } else {
            root.val = predecessor(root)
            root.left = deleteNode(root.left, root.val)
        }
    }
    return root
    

    function predecessor(node) {
        if (!node) return null
        node = node.left
        while (node.right) {
            node = node.right
        }
        return node.val
    }

    function successor(node) {
        if (!node) return null
        node = node.right
        while (node.left) {
            node = node.left
        }
        return node.val
    }
}
~~~
### 154.所有叶子左叶子节点
~~~
//dfs
function allLeftLeaves(root) {
    let res = [0]
    recursion(root, false, res)
    return res[0]

    function recursion(node, isLeft, res) {
        if (root.left == null && root.right == null && isLeft) {
            res[0] += node.val
        }
        if (node.left) recursion(node.left, true, res)
        if (node.right) recursion(node.right, false, res)
    }
}
~~~
### 154.所有叶子左叶子节点
~~~
//dfs
function allLeftLeaves(root) {
    let res = [0]
    recursion(root, false, res)
    return res[0]

    function recursion(node, isLeft, res) {
        if (root.left == null && root.right == null && isLeft) {
            res[0] += node.val
        }
        if (node.left) recursion(node.left, true, res)
        if (node.right) recursion(node.right, false, res)
    }
}
~~~
### 155.字母大小全排列
~~~
//回溯
function alphabetsPermutation(S) {
    const set = new Set()
    backTrack('', 0)
    function backTrack(str, index) {
        if (index >= S.length) {
            set.add(str)
            return
        }
        const cur = S[index]
        const upper = str + cur.toUpperCase()
        const lower = str + cur.toUpperCase()
        backTrack(upper, index + 1) 
        backTrack(lower, index + 1) 
    }
    return Array.from(set)
}
~~~
### 156.括号的分数
~~~
//栈
function scores(S) {
    const stack = []
    if (S.length < 1 ) return stack
    for (let item of S) {
        if (item === '(') {
            stack.push
        } else {
            if(stack[stack.length - 1] === '(') {
                stack.pop()
                stack.push(1)
            } else if (Number(stack[stack.length - 1])) {
                let num = 0
                while (stack[stack.length - 1] === '(') {
                    let cur = stack.pop()
                    num+= cur
                }
                stack.pop()
                stack.push(num*2)
            }

        }
    }
    return stack.reduce((sum, a) => sum+a)
}
~~~
### 158.解码
~~~
//动态规划
function numDecoding(s) {
    if (s[0] == '0') return 0
    const len = s.length
    const dp = new Array(len+1)
    dp[0] = 1
    dp[1] = 1
    for (let i = 1; i < len; i++) {
        const pre = s[i -1] 
        const cur = s[i]
        if (cur == '0') {
            if (pre === '1' || pre === '2') {
                dp[i+1] = dp[i-1]
            } else {
                return 0
            }
        } else {
            if (pre === '1' || pre === '2' && cur <= 6) {
                dp[i+1] = dp[i] + dp[i-1]
            } else {
                dp[i+1] = dp[i]
            }
        }
    }
    return dp[len]
}
~~~

you get a most head start on most kids 
you know the shitty thing about all of this  is that the strange behind the counter gave
me the free chenno that small act of kindness showed more compassion than my
mother gave me her entire goddamn lifeAKA031CAVI
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