# typescript-practice

## 1.Typescript Types

### string number type declaration
~~~
let stringone:string
let numberone:number
~~~
### array type declaration
~~~
let arrayone:number[];
let arraytwo:Array<number>;
let arraythree:any[];
~~~
### enum type declaration
~~~
enum Flag {success=0, error=1};
const statusOne:Flag = Flag.error;
console.log(status)
~~~
### any type
~~~
const oBox:any = document.getElementById('root')
oBox.style.color = 'red;'
~~~
### compound type
~~~
let numbertwo: number | null | undefined;
numbertwo = 3;
~~~
### void type
~~~
function run():void {
    console.log('return nothing')
}
~~~
### never type
~~~
let aaa:undefined;
let bbb: null;
let ccc:never;

aaa = undefined;
bbb = null;
~~~

## 2.Typescript Function
~~~
function run():string {
    return 'string';
}

const run = function(name: string, age: number):number {
    return 123;
}
~~~
### option arguments, should be at the end of arguments
~~~
function getInfo(name:string, age?:number):string{
    return `${name} with ${age}`;
}
~~~
### default arguments
~~~
function getInfo(name:string, age:number=20):string{
    return `${name} with ${age}`;
}
~~~
### rest arguments
~~~
function sum(...result:number[]):number{
    let sum = 0;
    result.forEach(item => sum += item)
    return sum;
}
~~~

## 3.Class

### es5 inheritance
~~~
function People(name) {
    this.name = name;
}
People.prototype.run = function() {
    console.log('people is runing')
}

People.mark = function() {
    console.log('People mark');
}

function Child(name) {
    People.call(this, name);
}
Child.prototype = People.prototype;
~~~
### typescript inheritance
~~~
class Person() {
    name:string;

    constructor(n:string) {
        this.name = n;
    }

    run():void{
        console.log(this.name);
    }
}

class Child extends Person {
    static print() {
        console.log('this is a static mathod');
    }

    constructor(name:string) {
        super(name);
    }

    work():void {
        console.log('children are working')
    }
}
~~~
#### *public:  can be used in class subclass and outside of class
#### *private: can only be used in class
#### *protect: can be used in class and subclass but not outside of class

#### *abstract class only provide the schema of the class,  needs subclass to implement the concrete implementations.
~~~
abstract class Animal{
    abstract eat(): any;
}
~~~
## 4.Interface
### contrains for object
~~~
function printLabel(labelInfo: {labelName: string}):void{
    console.log(labelInfo.labelName);
}

printLabel({labelName: 'slogan'})
~~~
### define interface
~~~
interface FullName {
    firstName: string;
    lastName: string;
}

function printName(name:FullName):void {
    print(name.firstName);
}
~~~
### optional interface arguments
~~~
interface OtherName {
    firstName: string;
    lastName?: string;
}

function printOtherName(name:OtherName):void {
    print(`${name.firstName}`);
}
printOtherName({firstName: 'sun'})
~~~

### function type interface
~~~
interface encrypt {
    (key:string, value:string):string
}

const md5:encrypt = function(key:string, value:string):string{
    return key + value;
} 
~~~
### indexed interface, mostly used in array
~~~
interface UserArr {
    [index:number]:string;
}

let arr:UserArr = ['123','456']
~~~
### constrains for object
~~~
inteface UserObj {
    [index:string]:string
}

let obj:UserObj = {
    'name': 'min'
}
~~~
### constrains for class
~~~
interface Animal {
    name: string;
    eat(str:string):void;
}

class Dog implements Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    eat(something:string){
        console.log(something);
    }
}
~~~