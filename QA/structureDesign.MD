### 1. 最后k个数的乘积
~~~
leetcode 1352
function ProductOfNumbers () {
    this.prods = []
}

ProductOfNumber.prototype.add = function (num) {
    if (num == 0) {
        this.prods = []
    } else {
        if (this.prods.length > 0) {
            this.prods.push(num* this.prods[this.prods.length -1])
        } else {
            this.prods.push(num)
        }
    }
}

ProductOfNumber.prototype.getProduct = function (k) {
    let n = this.prods.length
    if (k < n) {
        return this.prods[n-1]/this.prods[n-1-k]
    } else if (k == n) {
        return this.prods[n-1]
    } else {
        return 0
    }
}
~~~