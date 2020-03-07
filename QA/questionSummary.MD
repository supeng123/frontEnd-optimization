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