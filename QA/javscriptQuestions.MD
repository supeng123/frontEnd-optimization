### 1. this 指向问题
~~~
const shape = {
    radius: 10,
    diameter() {
        return this.radius * 2
    },
    perimeter: () => 2* Math.PI * this.radius
}

shape.diameter() //20
shape.perimeter() //NaN, 箭头函数的this指向父作用域，这里是window
~~~
### 2.符号隐式转义
~~~
+true  // 1
!"Lydia" // false
~~~
### 3.对象调用
~~~
const bird = {
    size: 'small'
}

const mouse = {
    name: 'Mickey',
    small: true
}

mouse[bird.size] mouse[bird['size']] 都有效
~~~
### 4.比较
~~~
let a = 3
let b = new Number(3)
let c = 3
console.log(a==b) true
console.log(a===b) false
console.log(a===c) false
~~~
### 5.函数对象
~~~
function bark() {
    console.log('Wan')
}
bark.animal = 'dog'
~~~
### 6.对象原型
~~~
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

const member = new Person('Lydia', 'Hallie')
Person.getfullName = function () {
    return `${this.firstName} ${this.lastName}`
}

console.log(member.getfullName) // TypeError 不是原型链上的方法
~~~
### 7.new的调用
~~~
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
const lydia = new Person('lydia', 'haha')
const sarah = Person('Sarah', 'smith')

console.log(lydia) //Person object
console.log(sarah) // undefined
~~~
### 8.事件传播的三个阶段
~~~
Capturing > Target > Bubbling
~~~
### 9.运算符先后
~~~
let number = 0
console.log(number++)
console.log(++number)
console.log(number)

//0,2,2
~~~
### 10.标签函数
~~~
function getPersonInfo(one, two, three) {
    console.log(one)
    console.log(two)
    console.log(three)
}
const person = 'Lydia'
const age = 21

getPersonInfo`${person} is ${age} years old`
//["", " is ", " years old"] 'Lydia' 21
~~~
### 11.rest参数类型
~~~
function getAge(...args) {
    console.log(typeof args)
}
getAge(21) //object
~~~
### 12.eval
~~~
const sum = eval('10*10+5') //number 105
~~~
### 13.hasOwnProperty
~~~
const obj = {1: 'a', 2: 'b', 3: 'c'}
const set = new Set([1,2,3,4,5])
obj.hasOwnProperty('1') //true 1和‘1’都是对象可识别属性
obj.hasOwnProperty(1) //true
set.has('1') //false
set.has(1) //true
~~~
### 14.对象属性覆盖
~~~
const obj = {1: 'a', 2: 'b', 1: 'c'}
console.log(obj) //{1: 'c', 2: 'b'} 对象重复键值会覆盖前面
~~~
### 15.string prototype
~~~
String.prototype.giveLydiaPizza = () => {
    return 'just give him a pizza'
}
const name = 'supeng'
name.giveLydiaPizza() //'just give him a pizza' 字符串原型挂载方法所有字符串都共享
~~~