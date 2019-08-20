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