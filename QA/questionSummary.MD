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
### 50.两个链表相加
~~~
funtion ListNode(val) {
    this.value = val;
    this.next = null
}

function addTwoNumbers (l1, l2) {
    const dummyHead = new ListNode(0)
    let current = dummyHead
    const carry = 0
    let pCurrent = l1, qCurrent = l2
    while (pCurrent != null || qCurrent != null) {
        const sum = pCurrent.value + pCurrent.Value + carry
        carray = parseInt(sum/10)

        let node = new ListNode(sum%10)
        current.next = node
        current = current.next

        if(pCurrent != null) pCurrent = pCurrent.next;
        if(qCurrent != null) qCurrent = qCurrent.next;
    }
    if (carry > 0) {
        current.next = new ListNode(carry)
    }
    return dummyHead.next
}
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
### 57.满足条件的所有路径
~~~
function getAllPaths(root, sum) {
    let paths = []
    function traveral(node, path) {
        if (!node) return;
        let rootVal = node.value
        path.push(rootVal)
        if (node.left === null && node.right === null) {
            if (path.reduce((a,b) => a + b) === sum) {
                paths.push(path)
            }
            return
        }
        traversal(node.left, path.slice(0))
        traversal(node.right, path.slice(0))
    }

    traversal(root, [])
    return paths
}
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
### 61.求不重复的最大长度字符串
~~~
function longestSubString(s) {
    let hash = {}
    let max = 0
    let left = 0
    for (var i = 0; i < s.length; i++) {
        let v = s[i]

        if (hash[v] >= left) {
            left = hash[v] + 1
        }

        hash[v] = i
        let len = i - left + 1
        if (max < len) max = len
    }
    return max
}

function longestSubString(s) {
    let set = new Set()
    let max = 0
    let j = 0
    for (var i = 0; i < s.length; i++) {
        if (!set.has(s[i])) {
            set.add(s[i])
            max = Math.max(set.size, max)
        } else {
            while (set.has(s[i]) {
                set.delete(s[j])
                j ++
            }
            set.add(s[i])
        }
    }
    return max
}
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
### 67.有效括号
~~~
function areBracketsClosed(randomString) {
    let sum = 0
    const splittedCharactors = randomString.split('');
    for (let i = 0; i < splittedCharactors.length; i++) {
        const charactor = splittedCharactors[i];
        if (charactor === '(') {
            sum ++;
        } else {
            if (sum === 0) {
                return false
            }
            sum --
        }
    }
    return sum === 0;
}

function areBracketsClosed(randomString) {
    let result = true
    const stack = []
    const map = new Map()
    map.set('(', ')')
    map.set('{', '}')
    map.set('[', ']')

    for(let i = 0; i < randomString.length; i++) {
        if (map.has(randomString[i])) {
            stack.push(map.get(randomString[i]))
        } else {
            if (stack.pop() !== randomString[i]) result = false
        } 
    }
    return stack.length === 0 && result
}
~~~
### 68.最长有效括号
~~~
function longestValidBrackets(randomString) {
    let max = 0
    let stack = []
    const splittedCharactors = randomString.split('');
    for (let i = 0; i < splittedCharactors.length; i++) {
        let tmpmax = 0
        for (let i = 0; i < splittedCharactors.length; i++) {
            const charactor = splittedCharactors[j];
            if (charactor === '(') {
                stack.push('(')
                tmpmax ++;
            } else {
                if (stack.length < 1) {
                    max = tmpMax > max ? tmpMax : max
                    break
                } else {
                    stack.pop()
                    tmpmax ++
                } 
            }
        }
        if (stack.length === 0) {
            max = tmpMax > max ? tmpMax : max
        }
        stack = []
    }
    return max;
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
~~~
### 72.数组去重（空间复杂度为O(1)）
~~~
function removeRepeatedItems(arr) {
    let sortedArray = arr.sort((a,b) => a - b);
    let  pre = 0
    let current = 1
    for (var i = 0 ; i < sortedArray.length; i++) {
        if (pre < sortedArray.length && current < sortedArray.length) {
            if (sortedArray[current]== sortedArray[pre]) {
                current +=  1
            } else {
                pre +=1
                sortedArray[pre] = sortedArray[current]
                current += 1
            }
        }
    }
    return sortedArray.slice(0, pre+1);
}
~~~
### 73.反转链表
~~~
function reverseLinkList(head) {
    if(!head || !head.next) return head
    let cur = head
    let pre = null
    while(cur) {
        const next = cur.next
        cur.next = pre
        pre = cur//前驱节点变成当前节点
        cur = next
    }
}
~~~
### 74.去除链表一个元素
~~~
function removeItemInLinkedList(head, item) {
    //哨兵节点
    const dummy = {
        next: head
    }
    let current = dummy
    while(current && current.next) {
        if(current.next.value === item) {
            current.next= current.next.next
        }
        current = current.next
    }
    return dummy.next
}
~~~
### 75.单双链表重组
~~~
origin 1-2-3-4-5-null
after 1-3-5-2-4-null

function reorganizeLinkedList(head) {
    if(!head && !head.next) return head;
    const dummySingle = {
        next: head
    }
    const dummyEven = {
        next: head.next
    }
    let flag = true
    let singleNode = dummySingle.next
    let evenNode = dummyEven.next
    while(singleNode && singleNode.next && evenNode && evenNode.next) {
        singleNode.next = singleNode.next.next
        evenNode.next = evenNode.next.next

        singleNode = singleNode.next.next
        evenNode = evenNode.next.next
    }
    singleNode.next = dummyEven.next
    return dummySingle.next
}
~~~
### 76.按k进行链表翻转
~~~
function reverseKLinkedList(head, k) {
    const dummyHead = {
        next: head
    }
    let index = 0
    let start = dummyHead
    let end = dummyHead.next
    while(end) {
        index ++
        if (index%k ===0) {
            start = reverseLinkList(start, end.next)
            end = start.next
        } else {
            end = end.next
        }
    }
}


function reverseLinkList(start, end) {
    let current = start.next
    let first = current
    let pre = start
    while (current != end) {
        let next = current.next;
        current.next = pre
        pre = current
        current = next
    }

    //pre变成小组的头结点
    start.next = pre
    //原来的头结点变成小组尾节点和下次小组的头结点
    first.next = current
    return first
}

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
### 77.两数相加
~~~
function twoNumberSum(arr, target) {
    const map = new Map()
    const result = []
    for (let i = 0; i < arr.length; i++) {
        const left = map.get(target - arr[i])
        if (left && left !== arr[i]) {
            return [i, left]
        } else {
            map.set(arr[i], index)
        }
    }
}
~~~
### 78.正负数排序复数在前正数在后
~~~
function sort(arr) {
    let j = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0){
            if (i !== j) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
            j++
        }   
    }
    return arr
}
~~~
### 79.预测股票价格
~~~
function predictStockPrice(prices) {
    if (prices.length < 1) return 0
    let minPrice = prices[0]
    let maxPrice = 0
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice){
            minPrice = prices[i]
        } else {
            maxPrice = price[i] - minPrice
        } 
    }
    return maxPrice
}
~~~
### 80.压缩字符串
~~~
aaabbbcc
a3b3c2
function compressString(str) {
    let index = 1
    let result = ''
    for (let i = 0; i < str.length - 1; i ++) {
        if (str[i]===str[i + 1]) {
            index = index + 1
        } else {
            result = result + str[i] + index
            index = 1
        }
    }
    result = result + str[str.length - 1] + index;
    return result.length < str.length ? result : str
}
~~~
### 81.判断两组字符串是否单词个数相等
~~~
function isTwoGroupStringEqual(str1, str2) {
    if (str1.length !== str2.length) return false
    const map = new Map()
    for (let i = 0 ; i < str1.length ; i++) {
        if (map.get(str1[i])) {
            map.set(str1[i], map.get(str1[i]) + 1)
        } else if (!map.get(str1)) {
            map.set(str1[i],1)
        }

        if (map.get(str2[i])) {
            map.set(str2[i], map.get(str2[i]) - 1)
        } else if (!map.get(str2[i])) {
            map.set(str2[i],-1)
        }
    }
    for (let letter of map) {
        if (letter[1] > 0) return false
    }

    return true
}
~~~
### 82.判断回文字符串
~~~
function isReversedEqualOringin(str) {
    const formattedStr = str.toLowerCase().replace(/[\W_]/g, "")
    let left = 0
    let right = formattedStr.length - 1
    while(left < right) {
        if (formattedStr[left] !== formattedStr[right]) return false
        left ++
        right --
    }
    return true
}

function ispanliTrim(str) {
    for (let i = 0, j = str.length - 1; i < j; i++,j--) {
        if (str.charAt(i) !== str.charAt(j)) {
            return isReverse(str, i, j-1) || isReverse(str, i+1, j)
        }
    }
    return true
}

isReverse(str, i, j) {
    while (i < j) {
        if (str.charAt(i) !== str.charAt(j)) return false
        i ++
        j --
    }
    return true
}

function isReversedEqualOringin(str) {
    let result = true;
    const formattedStr = str.toLowerCase().replace(/[\W_]/g, "")
    const reversedStr = formattedStr.split(',').reverse().join(',')
    for (let i = 0; i < formattedStr.length; i++) {
        if (formattedStr[i] !== reversedStr[i]) result = false
    }
    return result
}
~~~
### 83.最长的回文字符串
~~~
function longestReversedString(s) {
    if (s.length < 2) return s
    let start = 0
    let maxLength = 1
    for ( let i = 0; i < s.length; i++) {
        expandAroundCenter(i-1, i+1)
        expandAroundCenter(i, i+1)
    }

    function expandAroundCenter(left, right) {
        while (s[left] === s[right] && left >= 0 && right < s.length) {
            if (right - left + 1 > maxLength) {
                maxLength = right - left + 1
                start = left
            }
            left --
            right ++
        }
    }

    return s.substring(start, start + maxLength)
}

~~~

### 84.字符串内容相等分组
~~~
function groupString(s) {
    if (s.length < 1) return []
    const map = new Map()
    const result = []
    for (let item of s) {
        const arrayCode = Array(26).fill(0)
        for (let i = 0 ; i < item.length; i++) {
            const assic = item.charCodeAt(i) - 97
            arrayCode[assic] ++
        }
        const formattedCode = arrayCode.join('')
        if (map.has(formattedCode)) {
            map.set(formattedCode, map.get(formattedCode).push(item))
        } else {
            map.set(formattedCode, [item])
        }
    }
    for (let item of map) {
        result.push(item[1])
    }
    return result
}
~~~
### 85.螺旋矩阵
~~~
function spiralMatrix(arr) {
    if (arr.length < 1) return []
    const result = []
    let direction = 'right'
    let top = 0
    let left = 0
    let right = arr[0].length - 1
    let bottom = arr.length - 1

    while (left <= right && top <= bottom) {
        if (direction == 'right') {
            for (let i = left; i <= right; i++) {
                result.push(arr[top][i])
            }
            top ++;
            direction = 'down'
        } else if (direction == 'down') {
            for (let i = top; i <= bottom; i++) {
                result.push(arr[i][right])
            }
            right --;
            direction = 'left'
        } else if (direction == 'left') {
            for (let i = right; i >= left; i--) {
                result.push(arr[bottom][i])
            }
            bottom --;
            direction = 'top'
        } else if (direction == 'top') {
            for (let i = bottom; i >= top; i--) {
                result.push(arr[i][left])
            }
            left ++;
            direction = 'right'
        }
    }
}
~~~
### 86.矩阵置零
~~~
function setZeroToMatrix(arr) {
    //找出第一行是否有零
    let row = false
    let column = false
    for(let i = 0; i < arr[0].length; i++) {
        if (arr[0][i] === 0) row = true
    }
    //找出第一列是否有零
    for(let i = 0; i < arr.length; i++) {
        if (arr[i][0] === 0) column = true
    }
    //把出现零的行和列的头转化为零
    for(let i = 1; i < arr.length; i++) {
        for(let j = 1; j < arr[0].length; j++) {
            if (arr[i][j] === 0) {
                arr[i][0] = 0
                arr[0][j] = 0
            } 
        }
    }
    //利用第一行和第一列标零的情况把对应行列标零
    for(let i = 1; i < arr.length; i++) {
        for(let j = 1; j < arr[0].length; j++) {
            if (arr[i][0] === 0 || arr[0][j] === 0) {
                arr[i][j] = 0
            } 
        }
    }
    //判断第一行和列的零
    if(row) {
        for(let j = 0; j < arr[0].length; j++) {
            arr[0][j] = 0
        }
    }
    if(column) {
        for(let j = 0; j < arr.length; j++) {
            arr[j][0] = 0
        }
    }

    return arr;
}
~~~
### 87.斐波那契数列
~~~
function fib(n) {
    if (n < 1) return n
    const cache = []
    cache[0] = 0
    cache[1] =1
    for (var i = 2; i <= n; i++) {
        cache[i] = cache[i-1] + cache[i-2]
    }
    return cache[n];
}

function fib(n) {
    if (n < 1) return n
    let result = 0
    let pre = 0
    let next = 1
    for (var i = 2; i <= n; i++) {
        result = next + pre
        pre = next
        next = result
    }
    return result;
}

function fib(n) {
    const cache = []
    cache[0] = 0
    cache[1] =1
    
    function memoize(number) {
        if (cache[number] !== undefined) {
            return cache[number]
        }
        cache[number] = memoize(number - 1) + memoize(number - 2)
        return cache[number]
    }
    return memoize(n)
}
~~~
### 88.三数之和
~~~
var threeSum = function(nums) {
    const arr = nums.sort((a,b) => a-b)
    const result = []
    for (let i = 0; i < arr.length-2; i++) {
        if (i === 0 || arr[i] != arr[i-1]) {
            let start = i + 1
            let end = arr.length - 1
            while (start < end) {
                if (arr[i] + arr[start] + arr[end] === 0) {
                    result.push([arr[i],arr[start], arr[end]])
                    start++
                    end --
                    while (arr[start] == arr[start-1]) {
                        start ++
                    }
                    while (arr[end] == arr[end+1]) {
                        end --
                    }
                } else if (arr[i] + arr[start] + arr[end] < 0) {
                    start ++
                } else {
                    end --
                }   
            }
        } 
    }
    return result
};
~~~
### 89.二分搜索
~~~
function binarySearch(array,target) {
    const arr = array.sort((a,b) => a -b)
    let left = 0;
    let right = arr.length -1
    while (left <= right) {
        let middle = Math.floor((right+left)/2)
        if(arr[middle] > target) {
            left = middle + 1
        } else if (arr[middle] < target) {
            right = middle - 1
        } else {
            return middle;
        }
    }
}
~~~
### 90.旋转排序数组中最小值
~~~
//4560123
//456和0123都是排过序的
function binarySearchMin(arr) {
    let left = 0;
    let right = arr.length -1

    if (arr[right] > arr[left]) return arr[0]
    
    while (left < right) {
        let middle = Math.floor((right+left)/2)
        if(arr[middle] > arr[middle+1]) {
            return arr[middle + 1]
        } else if (arr[middle-1] > arr[middle]) {
            return arr[middle]
        }

        if (arr[middle]> arr[left]){
            left = middle+1
        }
        else if (arr[middle]< arr[right]){
            right = middle -1
        }
    }
}
~~~
### 91.所有数组中交叉的部分
~~~
function intersectionFind(arrays) {
    return [...new Set(
        arrays.reduce((result, array) => {
            result.filter(item => array.includes(item))
        })
    )]
}
~~~
### 92.存在重复的数据
~~~
function isContainedRepeatData(array) {
    const set = new Set()
    for (let i = 0 ; i < array.length; i++) {
        if (set.has(array[i])) return true
        else {
            set.add(array[i])
        }
    }
    return false
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
### 94.打家劫舍
~~~
function hostage(nums){
    if (nums.length === 0) return 0
    if (nums.length === 1) return nums[0]
    const memo = []
    memo[0] = nums[0]
    memo[1] = Math.max(nums[0], nums[1])
    for (let i = 2;i < nums.length; i++){
        memo[i] = Math.max(nums[i] + memo[i-2], memo[i-1])
    }
    return memo[nums.length - 1]
}

function hostage(nums){
    if (nums.length === 0) return 0
    if (nums.length === 1) return nums[0]

    let pre2 = nums[0]
    let pre1 = Math.max(nums[0], nums[1])
    for (let i=2; i < nums.length; i++){
        const temp = Math.max(nums[i] + pre2, pre1)
        pre2 = pre1
        pre1 = temp
    }
    return pre1
}
~~~
### 95.跳跃游戏
~~~
//[3,1,0,2,4]
//从当前的节点的树跳跃，能否跳跃到终点，3可以跳跃3步，0不跳跃
function jump(nums) {
    let maxJump = nums.lenght -1
    for (let i = nums.length -2; i>=0; i--) {
        if (nums[i]+i >= maxJump) {
            maxJump = i
        }
    }
    return maxJump === 0
}

function jump(nums) {
    const totallength = nums.length
    const memo = Array(totallength).fill(0)
    memo[totallength-1] = 1
    for (let i = totallength -2; i>=0; i--) {
        const maxJump = Math.min(i+nums[i], totalLength - 1)
        for (let j = i+1; j <= maxJump; j++) {
            if(memo[j] == 1) {
                memo[i] = 1
                break
            }
        }
    }
    return memo[0] === 1
}
~~~
### 96.最大子序列
~~~
//和打家劫舍的题目比较像
function maxSubSerial(nums){
    if (nums.length === 0) return 0
    if (nums.length === 1) return nums[0]
    const memo = []
    memo[0] = nums[0]
    let max = nums[0]
    for (let i = i;i < nums.length; i++){
        memo[i] = Math.max(nums[i] + memo[i-1], nums[i])
        max = Math.max(max, memo[i])
    }
    return max
}
~~~
### 97.最长路径
~~~
//已知第一行和第一列都为1，那么每个单独的节点的最长路径等于上面的路径加上左边的路径
//m为7，n为3
function maxSubSerial(m, n){
    const arr = []
    for (let i = 0; i < n; i++) {
        arr.push([])
    }

    for (let i = 0; i < n; i++) {
        arr[i][0] = 1 
    }

    for (let i = 0; i < m; i++) {
        arr[0][i] = 1 
    }

    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; i++) {
            arr[i][j] = arr[i-1][j] + arr[i][j-1]
        }
    }

    return arr[n-1][m-1]
}
~~~
### 98.最大乘积
~~~
function maxProduct(array) {
    const maxmemo = []
    const minmemo = []
    maxmemo[0] = array[0]
    minmemo[0] = array[0]
    let max = array[0]
    
    for (let i = 1; i < array.length; i++) {
        maxmemo[i] = Math.max(array[i]*maxmemo[i - 1], array[i], array[i]*minmemo[i-1])
        minmemo[i] = Math.min(array[i]*maxmemo[i - 1], array[i], array[i]*minmemo[i-1])
        max = Math.max(max, maxmemo[i])
    }
    return max
}
~~~
### 99.各自的乘积
~~~
function eachProducts(arrs) {
    let product = 1
    const result = new Array(arrs.length).fill(1)
    for (let i = 0; i < arrs.length; i++) {
        result[i] = product * result[i]
        product = product * arrs[i]
    }
    product = 1
    for (let i = arr.length - 1; i >= 0; i--) {
        result[i] = product * result[i]
        product = product * arrs[i]
    }
    return result
}
~~~
### 100.潜艇数量
~~~
function marineNumbers(arrs) {
    let count = 0
    for (let i = 0; i <= arrs.length; i++) {
       for (let j = 0; j <= arrs[0].length; j++) {
           if (arrs[i][j] === 'X') {
               count ++
               dfs(i, j)
           }
        } 
    }

    return count
    
    function dfs(row, column) {
        if (row < 0 || row >= arrs.length || column < 0 || column > arrs[0].length || arrs[row][column] != 'X' ) return
        arrs[row][column] = 0
        dfs(row + 1, column)
        dfs(row - 1, column)
        dfs(row, column + 1)
        dfs(row, column - 1)
    }
}
~~~
### 101.n结楼梯最大可能爬法
~~~
function staircases(n) {
    const result = []
    result[1] = 1
    result[2] = 2
    for (let i = 3; i <= n; i++) {
        result[i] = result[i-2] + result[i-1]
    }
    return result[n]
}
~~~
### 102.移动零到数组的后面
~~~
function moveZeros(arr) {
    let j = 0
    for (let i = 0; i <= arr.length; i++) { 
        if (arr[i] != 0) {
            arr[j] = arr[i]
            j++
        }
    }
    for (let i = j; i <= arr.length; i++) { 
        arr[i] = arr[0]
    }
    return arr
}
~~~
### 103.两个篮子装连续最多的果树
~~~
function mostTrees(arr) {
    const map = new Map()
    let min = arr.length - 1
    let j = 0
    let max = 1
    for (let i = 0; i <= arr.length; i++) { 
        map.set(arr[i], i)
        if (map.size > 2) {
            for (let [item, index] of map) {
                if (index < min) {
                    min = index
                }
            }
            map.delete(arr[min])
            j = min + 1
        }
        max = Math.max(max, i-j+1)
    }
    return max
}
~~~
### 104.间隔排序最小第一最大第二
~~~
function sort(arr) {
    arr.sort((a,b)=> a-b)
    let start = 0
    let end = arr.length - 1
    let result = []
    while (start <= end) {
        result.push(arr[start])
        result.push(arr[end])
        start++
        end--
    }
    return arr.length%2==1 ? result.slice(0, result.length-1) : result
}
~~~
### 105.加油站问题
~~~
function gaslineStation(gasline, cost) {
    let current = 0
    let start = 0
    let totalGasline = 0
    let totalCost = 0
    for (let i = 0; i < gasline.length; i++) {
        totalGasline += gasline[i]
        totalCost += cost[i]
    }
    if (totalGasline < totalCost) return -1

    for (let i = 0; i < gasline.length; i++) {
        current = current + gasline[i] - cost[i]
        if (current < 0) {
            current = 0
            start = i + 1
        }
    }

    return start
}
~~~
### 106.合并两个有序链表
~~~
function mergeTwoLinkedList(l1,l2) {
    let cur = new ListNode()
    const dummyNode = cur

    while (l1 !== null && l2 !== null) {
        if (l1.value > l2.value) {
            cur.next = l2
            l2 = l2.next
        } else {
            cur.next = l1
            l1 = l1.next
        }
        cur = cur.next
    }
    if (l1 !== null) {
        cur.next = l1
    }
    if (l2 !== null) {
        cur.next = l2
    }
    return dummy.next
}
~~~
### 107.四数之和
~~~
/**
var fourSum = function(nums, target) {
    const result = []
    const len = nums.length
    nums.sort((a,b) => a-b)
    let left
    let right
    let sum
    for (let i = 0; i < len - 3; i++) {
        if (i > 0 && nums[i] ===  nums[i-1]) continue;

        for (let j = i+1; j < len - 2; j++) {
            if (j > i+1 && nums[j] ===  nums[j-1]) continue;
                left = j + 1
                right = len - 1
                while (left < right) {
                    sum = nums[i] + nums[j] + nums[left] + nums[right]
                    if (sum === target) {
                        result.push([nums[i], nums[j], nums[left], nums[right]])
                        left ++
                        while (nums[left] == nums[left - 1]) {
                            left ++
                        } 
                        right --
                        while (nums[right] == nums[right + 1]) {
                            right --
                        }
                    } else if (sum < target) {
                        left ++
                        while (nums[left] == nums[left - 1]) {
                            left ++
                        } 
                    } else if (sum > target) {
                        right --
                        while (nums[right] == nums[right + 1]) {
                            right --
                        }
                    }
                }
        }
    }
    return result
};
~~~
### 108.删掉数组重复项
~~~
funciton removeDuplicates(nums) {
    let slow = 0
    for (let fast = 2; fast < nums.length; i++) {
        if (nums[slow] !== nums[fast]) {
            nums[slow + 2] = nums[fast]
            slow ++
        }
    }
    return slow + 2
}
~~~
### 109.用循环实现前序遍历
~~~
function traversal(root) {
    const result = []
    const stack = []
    stack.push(root)
    while (stack.length !== null){
        let currentNode = stack.pop()
        result.push(currentNode.val)
        currentNode.right && stack.push(currentNode.right)
        currentNode.left && stack.push(currentNode.left)
    }
    return result
}
~~~
### 110.竖直打印文字
~~~
//how are you
//hay oro weu
function veticalPrint(str) {
    const arr = str.join(' ')
    let maxLength = arr[0].length
    let ss = ''
    for (let item of arr) {
        if (item.length > maxLength) maxLength = item.length
    }

    for (let i = 0; i < maxLength; i++) {
        for (let j = 0; j < arr.length; j++) {
            let s = arr[j][i]
            if (s === '') {
                ss += ' '
            } else {
                ss += s
            }
        }
        ss.replace(/\s*$/g, '')
        if (i != maxLength) {
            ss += '-'
        }
    }
    return ss.split('-')
}
~~~
### 111.比较退格字符串
~~~
function backspaceCompare(S, T) {
    let i = S.length - 1
    let j = T.length - 1
    let backSpaceS = 0
    let backSpaceT = 0
    while (i >=0 || j>=0) {
        while (i >=0) {
            if (S[i] === "#") {
                backSpaceS++
                i--
            } else if (backSpacS > 0) {
                backSpaceS--
                i--
            } else {
                break
            }
        }
        while (j >=0) {
            if (T[i] === "#") {
                backSpaceT++
                j--
            } else if (backSpacT > 0) {
                backSpacT--
                j--
            } else {
                break
            }
        }
        if (S[i] !== T[j]) return false
        i --
        j --
    }
    return true
}
~~~
### 112.去除所有为target的叶子节点
~~~
function removeAllLeaves(root, target) {
    if (root == null) return null
    if (root.left === null && root.right === null && root.val === target) return null
    root.left = removeAllLeaves(root.left, target)
    root.right = removeAllLeaves(root.right, target)
    if (root.left === null && root.right === null && root.val === target) return null
    return root
}
~~~
### 113.反转链表的第m到n位
~~~
function reverseLinkedList(head, m, n) {
    const dummyNode = {next: head}
    
    let listNode = dummyNode
    for (let i = 0; i < m - 1; i++) {
        listNode = listNode.next
    }
    let cur = listNode.next
    let pre = null
    for (let i = 0; i < n- m + 1; i++) {
        let next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    listNode.next.next = cur
    listNode.next = pre
    return dummyNode.next
}
~~~
### 113.是否为回文链表
~~~
function reverseLinkedList(head) {
    if (head === null && head.next === null) return true
    let reversed = null
    let pre = null
    let mid = head
    while (head !== null && head.next !== null) {

        pre = mid
        mid = mid.next
        head = head.next.next

        pre.next = reversed
        reversed = pre
    }
    if (head) mid = mid.next
    while (mid) {
        if (mid.val !== reversed.val) return false
        mid = mid.next
        reversed = reversed.next
    }
    return true
}
~~~
### 114.删除链表里面一个元素
~~~
function removeNode(head, val) {
    const dummyNode = {
        next: head
    }
    let pre = dummyNode
    while (pre.next) {
        if (pre.next.val === val) {
            pre.next = pre.next.next
        } else {
            pre = pre.next
        }
    }
    return dummyNode.head
}

function removeNode(node) {
    let deleteNode = node.next
    node.val = deleteNode
    node.next = deleteNode.next
    deleteNode.next = null
}
~~~
### 115.删除重复的链表元素
~~~
function removeRepeatElement(head) {
    let cur = head
    while (cur!== null) {
        let nextNode = cur.next
        while(nextNode !== null && cur.val === nextNode.val) {
            nextNode = nextNode.next
        }
        cur.next = nextNode
        cur = nextNode
    }
    return head
}

function removeRepeatElement(head) {
    const dummyNode = {next: head}
    let pre = dummyNode
    let cur = pre.next
    
    while (cur!=null && cur.next !=null) {
        
        while(cur.next && cur.val === cur.next.val) {
            cur.next = cur.next.next
            isRepeated = true
        }
        if (isRepeated) {
            pre.next = cur.next
            cur = cur.next
        } else {
            pre = pre.next
            cur = cur.next
        }
    }
    return dummyNode.next
}
~~~
### 116.小岛面积
~~~
var maxAreaOfIsland = function(grid) {
    let result = 0
    for (let row = 0 ; row < grid.length; row++) {
        for (let column = 0; column < grid[0].length; column++) {
            if (grid[row][column] === 1) {
                const counts = dfs(row, column)
                result = Math.max(result, counts)
            }
        }
    }

    return result

    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === 0) {
            return 0
        }
        grid[r][c] = 0
        let count  = 1
        count += dfs(r+1, c)
        count += dfs(r-1, c)
        count += dfs(r, c+1)
        count += dfs(r, c-1)
        return count
    }
};
~~~
### 117.奇数偶数排序
~~~
function sort(nums) {
    let start = 0
    let end = num.length - 1
    while (start < end) {
        const isStartEven = nums[start]%2 === 0
        const isEndEven = nums[end]%2 === 0

        if (isStartEven && isEndEven) {
            start++
        } else if (isStartEven && !isEndEven) {
            start++
            end--
        } else if (!isStartEven && !isEndEven) {
            end--
        } else {
            [nums[start], nums[end]] = [nums[end], nums[start]]
        }
    }
    return nums
}

function sort(nums) {
    let j = 1
    for (let i = 0; i < nums.length; i+=2) {
        if (nums[i]%2 == 1) {
            while(nums[j]%2 == 1 && j < nums.length) {
                j +=2
            }
            [nums[i], nums[j]] = [nums[j], nums[i]]
        }
    }
    return nums
}
~~~
### 118.n个节点组成二叉树有多少种
~~~
function permutationBinaryTree(n) {
    const result = []
    result[0] = 1
    result[1] = 1
    for (let i = 2; i <= n; i++) {
        result[i] = 0
        for (let j = 1; j <= i; j++) {
            result[i] += result[j - 1] * result[i - j]
        }
    }
    return result[n]
}

~~~
### 119.二维矩阵，三角矩阵最小路径（动态规划）
~~~
function twoDemensionMatrix(arrs) {
    let row = arrs.length;
    let colomn = arrs[0].length;
    const result = []
    for (let i = 0; i < row; i++) {
        result.push([])
        for (let j = 0; j < column; j++) {
            result[i][j] = Number.MAX_VALUE
        }
    }
    result[i][j] = arrs[0][0]

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            if (i > 0) {
                result[i][j] = Math.min(result[i][j], result[i-1][j] + nums[i][j])
            }
            if (j > 0) {
                result[i][j] = Math.min(result[i][j], result[i][j-1] + nums[i][j] )
            }
        }
    }
    return nums[row-1][column-1]
}

function triangleMatrix(arrs) {
    let row = arrs.length;
    for (let i = 1; i < row; i++) {
        for (let j = 0; j <= i; j++) {
            let a = arrs[i-1][j] !== undefined ? arrs[i-1][j] : Number.MAX_VALUE
            let b = arrs[i-1][j-1] !== undefined ? arrs[i-1][j-1] : Number.MAX_VALUE
            arrs[i][j] += Math.min(a, b)
        }
    }
    return Math.min(...arrs[row-1])
}

function triangleMatrix(arrs) {
    let row = arrs.length;
    const result = []
    for (let i = 1; i < row; i++) {
        for (let j = 0; j <= i; j++) {
            result[i][j] = Number.MAX_VALUE
        }
    }

    for (let i = 1; i < row; i++) {
        for (let j = 0; j <= i; j++) {
            result[i][j] = Math.min(result[i][j], result[i-1][j] + nums[i][j])
            if (j > 0) {
                result[i][j] = Math.min(result[i-1][j-1], result[i-1][j-1] + nums[i][j])
            }
        }
    }
    return Math.min(...result[row-1])
}

function triangleSecond(arrs) {
     let row = arrs.length;
    const result = []
    for (let i = 0; i < row; i++) {
        result.push([])
        for (let j = 0; j <= i; j++) {
            result[i][j] = Number.MAX_VALUE
        }
    }

    result[0][0] = arrs[0][0]
    for (let i = 1; i < row; i++) {
        for (let j = 0; j <= i; j++) {
            if (i > 0 && j < i) {
                result[i][j] = Math.min(result[i][j], result[i-1][j] + arrs[i][j])
            }
            
            if (j > 0) {
                result[i][j] = Math.min(result[i][j], result[i-1][j-1] + arrs[i][j])
            }
            console.log(result[i][j])
        }
    }
    return Math.min(...result[row-1])
}
~~~
### 120.最大的装水面积
~~~
function area(arr) {
    let result = 0
    let left = 0
    let right = arr.length - 1
    while (left < right) {
        const area = (right - left) * Math.min(arr[left], arr[right])
        result = Math.max(area, result)
        if (arr[left] <= arr[right]) left ++
        right --
    }
    return result
}
~~~
### 121.二叉树右视图
~~~
function rightSideView(root) {
    const result = []
    if (!root) return result
    const queue = []
    queue.push(root)
    while (queue.length !== 0) {
        let len = queue.length
        while (len > 0) {
            let node = queue.shift()
            if (len == 1) result.push(node.val)
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
            len--
        }
    }
    return result
}
~~~
### 122.一条直线上最多的点
~~~
function mostDots(nums) {
    if (nums.length <=2) return 2
    let result = 2
    for (let i = 0; i < nums.length; i++) {
        let repeated = 1
        let hash = {}
        for (let j = i+1; j < nums.length; j++) {
            let [[x1, y1], [x2, y2]] = [nums[i], nums[j]]
            if (x1 == x2 && y1  == y2) {
                repeated++;
                continue;
            } 
            let k = (x1-x2)/(y1-y2)
            if (k === -infinite) k = infinite
            if (hash[k]) {
                hash[k] + 1
            } else {
                hash[k] = 1
            }
        }
        result = Math.max(result, Math.max(...Object.values(hash))+ repeated) 
    }
    return result
}
~~~
### 123.单词搜索
~~~
function wordSearch(matrix, word) {
    matrix[-1] = []
    matrix.push([])

    for (let i = 0 ; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] ===  word[i] && dfs(i,j,0)) return true
        }
    }
    return false

    function dfs(row, column, index) {
        if index+1 == word.length return true
        let temp = matrix[row][column]
        matrix[row][column] = false

        if (matrix[row][column + 1] == word[index+1] && dfs(row, column+1, index+1)) return true
        if (matrix[row][column - 1] == word[index+1] && dfs(row, column-1, index+1)) return true
        if (matrix[row+1][column] == word[index+1] && dfs(row+1, column, index+1)) return true
        if (matrix[row-1][column] == word[index+1] && dfs(row-1, column, index+1)) return true

        matrix[row][column] = temp
    }
}
~~~
### 124.排序链表
~~~
function linkListPermutation(head) {
    if (!head || !head.next) return head
    function mergeList(left, right) {
        let leftNode = left
        let rightNode = right
        const dummyNode = new listNode(0)
        let nNode = dummyNode
        while(leftNode && rightNode) {
            if (leftNode.val <= rightNode.val){
                nNode.next = leftNode
                leftNode = leftNode.next
            } else {
                nNode.next = rightNode
                rightNode = rightNode.next
            }
            nNode = nNode.next
        }
        nNode.next = leftNode ? leftNode : rightNode
        return dummyNode.next
    }

    let mid = head
    let fast = head
    while(fast.next && fast.next.next) {
        mid = mid.next
        fast = fast.next.next
    }
    let rightNode = mid.next
    mid.next = null
    let leftNode = head
    return mergeList(linkListPermutation(leftNode), linkListPermutation(rightNode))
}
~~~
### 125.DNA重复查找
~~~
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
~~~
### 126.环形链表
~~~
function roundLinkedList(head) {
    if (!head || !head.next) return null
    let slow = head
    let fast = head
    let start = head
    while (fast.next && fast.next.next) {
        slow = slow.next
        fast = fast.next.next
        if (slow == fast) {
            while(slow !== start) {
                start = start.next
                slow = slow.next
            }
            return slow
        }
    }
    return null
}
//what I'm saying is that If I have been to over too far in my pursuit of the finer things and cultivating an image
//If I have cuased you some discomfort, It's only an overzealous ex-professional hustler from the mid east trying to erradicate
//unsavory remnants of many hotel rooms I still wake up screamnng over
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