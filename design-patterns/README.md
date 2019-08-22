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