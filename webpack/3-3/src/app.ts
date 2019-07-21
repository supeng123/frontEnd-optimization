import * as _ from "lodash"

console.log(_.chunk([1,2,3,4]),2)
const NUM = 45

interface Cat {
    name: String,
    sex: String
}

function touchCat(cat:Cat):void{
    console.log('miao&',cat.name)
}

touchCat({
    name: 'tom',
    sex: 'female'
})
