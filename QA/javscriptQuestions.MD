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