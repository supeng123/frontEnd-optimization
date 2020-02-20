class SetCollection {
    constructor() {
        this.items = {}
    }

    add(value) {
        if (this.has(value)) return false
        this.items[value] = value
        return true
    }

    remove(value) {
        if (!this.has(value)) return false
        delete this.items[value]
        return true
    }

    clear() {
        this.items = {}
    }

    has(value) {
        this.items.hasOwnProperty(value)
    }

    size() {
        return Object.keys(this.items).length
    }

    values() {
        return Object.keys(this.items)
    }

    union(otherSet) {
        let uninSet = new SetCollection()
        let values = this.values()
        for (let i = 0; i < values.length; i++){
            uninSet.add(values[i])
        }

        let otherValues = otherSet.values()
        for (let j = 0; j < otherValues.length; j++){
            uninSet.add(otherValues[j])
        }
    }

    intersection(otherSet) {
        let intersectionSet = new SetCollection()
        let values = this.values()
        for (let i = 0; i < values.length; i++){
            let item = values[i]
            if (otherSet.has(item)) {
                intersectionSet.add(item)
            }
        }
        return intersectionSet
    }

    difference(otherSet) {
        let differenceSet = new SetCollection()
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            let item = values[i]
            if (!otherSet.has(item)) {
                differenceSet.add(item)
            }
        }
        return differenceSet
    }

    subSet(otherSet) {
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            let item = values[i]
            if (!otherSet.has(item)) {
                return false
            }
        }
        return true
    }
}