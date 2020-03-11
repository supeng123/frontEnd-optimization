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