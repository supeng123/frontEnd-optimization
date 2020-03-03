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