## Factory Pattern
~~~
class Product {
    constructor(name) {
        this.name = name
    }

    init() {
        alert('init')
    }

    func1() {
        alert('func1')
    }

    func2() {
        alert('func2')
    }
}

class Creator {
    create(name) {
        return new Product(name)
    }
}

let creator = new Creator()
let p = creator.create('audi')
p.init()
~~~

## Single Instance Pattern
~~~
class SingleInstance {
    login () {
        console.log('log in ...')
    }
}

SingleInstance.getInstance = (function() {
    let instance
    return function() {
        if (!instance) {
            instance = new SingleInstance
        }
        return instance
    }
})()

let obj1 = SingleInstance.getInstance()
let obj2 = SingleInstance.getInstance()

console.log(obj1 === obj2)
~~~

### Adaptor Pattern
~~~
class OldCharge() {
    chargeBattery() {
        return 'battery is in charging'
    }
}

class Adaptor {
    constructor() {
        this.adapter = new OldCharge()
    }

    charging() {
        let info = this.adapter.chargeBattery()
        return `${info}->220v->adaptor`
    }
}

let newAdaptor = new Adaptor()
newAdaptor.charging()
~~~

### Decoration Pattern
~~~
class Circle {
    draw() {
        console.log('draw a circle')
    }
}

class Decorator {
    constructor(circle) {
        this.circle = circle
    }

    draw() {
        this.circle.draw()
        this.setRedBorder(circle)
    }
    
    setRedBorder(circle) {
        console('add red border')
    }
}

const newDecorator = new Decorator(new Circle())
newDecorator.draw()

function mixins(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list)
    }
}

const Foo = {
    foo() {
        alert('foo')
    }
}

@mixins(Foo)
class Myclass {

}

let obj = new Myclass()
obj.foo()
~~~

### Proxy Pattern
~~~
class ReadImg {
    constructor(filename) {
        this.filename = filename
        this.loadFromDisk()
    }

    display() {
        console.log('display...' + this.filename)
    }

    loadFromDisk() {
        console.log('loading...' + this.filename)
    }
}

class ProxyImg {
    constructor(filename) {
        this.readImg = new ReadImg(filename)
    }

    display() {
        this.readImg.display()
    }
}

let proxyImg = new ProxyImg('1.png')
proxImg.display()

let star = {
    name: 'MR Zhang',
    age: 25,
    phone: '13954562435'
}

let agent = new Proxy(star, {
    get: function (target, key) {
        if (key === 'phone') {
            return '13384969493'
        }
        if (key === 'price') {
            return 120000
        }
        return target[key]
    }

    set: function (target, key, value) {
        if (key === 'customPrice') {
            if (val < 100000) {
                throw new Error('price is too low')
            } else {
                target[key] = value
                return true
            }   
        }
    }
})

console.log(agent.name)
console.log(agent.phone)
console.log(agent.price)
~~~

### Observer Pattern
~~~
class Subject {
    constructor() {
        this.state = 0
        this.observers = []
    }

    getState() {
        return this.state
    }

    setState(state) {
        this.state = state
        this.notifyAllObservers()
    }

    notifyAllObservers() {
        this.observers.forEach(observer => {
            observer.update
        })
    }

    attach(observer) {
        this.observers.push(observer)
    }
}

class Observer () {
    constructor(name, subject) {
        this.name = name
        this.subject = subject
        this.subject.attach(this)
    }

    update() {
        console.log(`${this.name} update, state:${this.subject.getState()}`)
    }
}

const subject = new Subject()
const observerOne = new Observer('01', subject)

subject.setState('002')
~~~

### Iterator Pattern
~~~
class Iterator {
    constructor(container) {
        this.list = container.list
        this.index = 0
    }

    next() {
        if (this.hasNext()) {
            return this.list[this.index++]
        }
    }

    hasNext() {
        if (this.index >= this.list.length) {
            return false
        }
        return true
    }
}

class Container {
    constructor(list) {
        this.list = list
    }

    getIterator() {
        return new Iterator(this)
    }
}

var arr = [1,2,3,4,5,6]
let container = new Container(arr)
let iterator = container.getIterator()

while(iterator.hasNext()) {
    console.log(iterator.next())
}

function each(data) {
    let iterator = data[Symbol.iterator]()
    let item = {done: false}
    while(!item.done) {
        item = iterator.next()
        if(!item.done) {
            console.log(item.value)
        }
    }
}
~~~

### Status Pattern
~~~
class State {
    constructor(color) {
        this.color = color
    }

    handle(context) {
        console.log(`turn to ${this.color}` light)
        context.setState(this)
    }
}

class Context = {
    constructor() {
        this.state = null
    }

    getState() {
        return this.state
    }

    setState(state) {
        this.state = state
    }
}

let context = new Context()
let green = new State('green')
let red = new State('red')
let yellow = new State('yellow')

green.handle(context)
console.log(context.getState())
~~~
### Bridge Patter
~~~
class Color {
    constructor(name) {
        this.name = name
    }
}

class Shape {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    draw() {
        console.log(`${this.color.name} ${this.name}`)
    }
}

let red = new Color('red')
let yellow = new Color('yellow')

let circle = new Shape('circle' red)
circle.draw()
let triangle = new Shape('triangle', yellow)
triangle.draw()

//实体与行为的抽象分离
// 1.abstract Class
public interface FileLoader {
    upload(path: string): Object
    check(object: Object): Boolean
}
//2.entity class
public class FileUploaderImpl implement FileLoader {
    private executor:fileUploaderExecutor = null
    constructor(executor:fileUploaderExecutor) {
        this.executor = executor
    }

    upload(path: string): Object {
        return this.executor.uploadFile(path)
    }

    check(object: Object): Boolean {
        return this.executor.checkFile(object)
    }
}
//3.abstract behaivor
public interface FileUploaderExecutor {
    uploadFile(path: String): Object
    checkFile(object: Object): Boolean
}
//4/ entity behaivor
public class LinuxFileUploadExecutor implement FileUploaderExecutor {
    uploadFile(path: String):Object {
        return null
    }
    checkFile(object: Object):Boolean {
        return false
    }
}

public class WindowsFileUploadExecutor implement FileUploaderExecutor {
    uploadFile(path: String):Object {
        return null
    }
    checkFile(object: Object):Boolean {
        return false
    }
}


~~~

### Command Pattern
~~~
var setCommand = function(button, fn) {
    button.onClick = function() {
        fn()
    }
}

var menu = {
    reFresh: function() {
        console.log('refresh')
    }
}

var commandObj = function(reciever) {
    return function() {
        reciever.reFresh()
    }
}

var commanObj1 = commonObj(menu)
setCommand(btn, commonObj)

~~~