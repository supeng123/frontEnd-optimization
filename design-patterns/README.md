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