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