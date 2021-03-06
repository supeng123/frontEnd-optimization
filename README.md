- [typescript-practice](#typescript-practice)
  - [1.Typescript Types](#1typescript-types)
    - [string number type declaration](#string-number-type-declaration)
    - [array type declaration](#array-type-declaration)
    - [enum type declaration](#enum-type-declaration)
    - [any type](#any-type)
    - [compound type](#compound-type)
    - [void type](#void-type)
    - [never type](#never-type)
    - [temporary death zone](#temporary-death-zone)
    - [object destructure](#object-destructure)
  - [2.Typescript Function](#2typescript-function)
    - [option arguments, should be at the end of arguments](#option-arguments-should-be-at-the-end-of-arguments)
    - [default arguments](#default-arguments)
    - [rest arguments](#rest-arguments)
  - [3.Class](#3class)
    - [es5 inheritance](#es5-inheritance)
    - [typescript inheritance](#typescript-inheritance)
      - [*public:  can be used in class subclass and outside of class](#public-can-be-used-in-class-subclass-and-outside-of-class)
      - [*private: can only be used in class](#private-can-only-be-used-in-class)
      - [*protect: can be used in class and subclass but not outside of class](#protect-can-be-used-in-class-and-subclass-but-not-outside-of-class)
      - [*abstract class only provide the schema of the class,  needs subclass to implement the concrete implementations.](#abstract-class-only-provide-the-schema-of-the-class-needs-subclass-to-implement-the-concrete-implementations)
  - [4.Interface](#4interface)
    - [contrains for object](#contrains-for-object)
    - [define interface](#define-interface)
    - [optional interface arguments](#optional-interface-arguments)
    - [function type interface](#function-type-interface)
    - [indexed interface, mostly used in array](#indexed-interface-mostly-used-in-array)
    - [constrains for object](#constrains-for-object)
    - [constrains for class](#constrains-for-class)
    - [interface for class instance](#interface-for-class-instance)
  - [5. Function](#5-function)
    - [original function definition](#original-function-definition)
  - [6.Generic Paradigm](#6generic-paradigm)
    - [generic interface](#generic-interface)
    - [generic inheritance](#generic-inheritance)
    - [generic class example](#generic-class-example)
    - [export import](#export-import)
    - [Class Decoration](#class-decoration)
    - [Method Decoration](#method-decoration)
    - [Type copy](#type-copy)
# typescript-practice

## 1.Typescript Types

### string number type declaration
~~~
let stringone:string
let numberone:number | null = 3;
~~~
### array type declaration
~~~
let arrayone:number[];
let arraytwo:Array<number>;
let arraythree:any[];
let arrayfour: ReadonlyArray<number> = [1, 2, 3]
~~~
### enum type declaration
~~~
enum Flag {success=0, error=1};
const statusOne:Flag = Flag.error;
console.log(statusOne)
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

//use ! to avoid null value
function broken(name: string | null):string {
    function postFix(epiter: string) {
        return name!.charAt(0) + '.the' + epiter
    }
    name = name || 'Bob'
    return postFix(name)
}
broken(null)
~~~

### temporary death zone
~~~
// can not to manipulate variable let aaa before it has been declared
aaa +++

let aaa = 1
~~~
### object destructure
~~~
let o = {
    a: 'foo',
    b: 12,
    c: 'bar'
}

let {a, b} : {a:string, b:number} = o
let {a:slogan, b:sunminjuan} = o
console.log(slogan) // foo,
console.log(sunminjuan) //12
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
    readonly firstName: string;
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

interface Deck {
    suits: Array<string>,
    createCardPicker(this: Deck): () => Card
}

//example
interface UIElement {
    addClickListener(onclick:(this: void, e: Event) => void):void
}

class Handler {
    type: string
    onClickBad = (e: Event) => {
        this.type = e.type
    }
}

let h = new Handler()
let uiElement: UIElement = {
    addClickListner() {

    }
}
uiElement.addClickListner(h.onClickBad)
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
### interface for class instance
~~~
interface ClockInterface {
    tick()
}
interface ClockConstructor {
    new (hour: number, munite: number): ClockInterface
}
function createClock(c:ClockConstructor, hour:number, munite: number):ClockInterface {
    return new c(hour, minute)
}

class DigitalClock implements ClockInterface {
    contructor(h:number, m: number) {}
    tick () {

    }
}

let digital = createClock(DigitalClock, 12, 7)
~~~
## 5. Function
### original function definition
~~~
let myAdd:(baseValue:number, increment:number) => number = function(x:number, y:number):number {
    return x + y;
}
~~~

## 6.Generic Paradigm
~~~
//input and output are the same type,
in the following example, T could be replace by other letter, only if
three of those are the same
function getData<T>(value: T): T {
    return value
}

getData<string>('this is a string')

class MinClass<T> {
    public list:T[] = [];

    add(value:T):void {
        this.list.push(value);
    }

    min():T{
        let minNum = this.list[0];
        this.list.forEach(item => {
            if (minNum > item) minNum = item;
        });
        return minNum;
    }
}

//instantiate the class with type
let m1 = new MinClass<number>()
let m1 = new MinClass<string>()
~~~

### generic interface
~~~
interface ConfigFn{
    <T>(value:T, value2:T):T;
}


const getData:ConfigFn = function<T>(value: T, value2: T):T{
    return value + value2;
}

getData<string>('supeng','sunminjuan')

//alternative way
interface ConfigFn<T>{
    (value:T, value2:T):T
}

function getData<T>(value:T, value2:T):T{
    return value + value2;
}

const myGetData:ConfigFn<string> = getData;

myGetData('s', 's')
~~~
### generic inheritance
~~~
function getProperty<T, K extends keyof T>(object: T, key:K) {
    return object[key]
}
let x = {a:1, b:2, c:3}
getProperty(x, d) //error d is not exist in x
getProperty(x, c) //3

//second example
class LionKeeper {
    nametag: string
}
class Animal {
    numlen: number
}
class Lion extends Animal{
    keep: LionKeeper
}

function createInstance<T extends Animal>(c: new() => T): T {
    return new c()
}
createInstance(Lion).keeper.nametag
~~~
### generic class example
~~~
class MySqlDb<T>{
    add(info:T):boolean{
        console.log(info)
        return true;
    }
}

class User{
    name:string | undefined;
    password:string | undefined;
}

var u = new User();
u.name = 'su';
u.password = '123';
var Db = new MySqlDb<User>();
Db.add(u);
~~~

~~~
interface DBI<T> {
    add(info:T): boolean;
    update(info:T, id:number): boolean;
    delete(id:number): boolean;
    get(id:number): any[];
}

class MysqlDb <T> implements DBT<T>{
    add(info:T): boolean {

    };
    update(info:T, id:number): boolean {

    };
    delete(id:number): boolean {

    };
    get(id:number): any[] {

    };
}

const oMysql = new MysqlDb<User>();
oMysql.add(u)

~~~
### export import 
~~~
//only one was exported
export default function aaa ():void{

}
import default from 'xxxx'

//multiple were exported
export function aaa ():void{

}
export function bbb ():void{
    
}
import {aaa, bbb} from 'xxxx'

//alternative multiple were exported
function aaa ():void{

}
function bbb ():void{
    
}
export {aaa, bbb};
import {aaa, bbb} from 'xxxx'

export nameSpace A {
    put all your implementations with same names here, and export them
}
~~~

### Class Decoration
~~~
function logClass(params: any) {
    // the params is referred to HttpClient
    console.log(params)

    params.prototype.apiUrl= 'xxxx';
    params.prototype.run = function() {
        console.log('run')
    }
}

@logClass
class HttpClient{
    contructor() {

    }

    getData() {

    }
}

var http:any = new HttpClient();
console.log(http.apiURl)
console.log(http.run())

//decoration with arguments
function logArgumentsClass(params: string) {
    return function (target:any) {
        //target is HttpClient
        console.log(target)
        console.log(params)
    }
}

@logClass('hello')
class HttpClient{
    contructor() {

    }

    getData() {

    }
}


//decoration rewrite the constructor
function anotherLogClass(target:any) {
       //target is HttpClient
        console.log(target)

        return class extends target {
            apiUrl:string = "after modified apiUrl"

            getData() {
                console.log(this.apiUrl)
            }
        }

}

@anotherLogClass
class HttpClient{
    public apiUrl:string | undefined
    contructor() {
        this.apiUrl = "before modifed apiUrl"
    }

    getData() {
        console.log(this.apiUrl)
    }
}

~~~

### Method Decoration
~~~
//has three paramters
function logMethod(params: any) {
    return function(target:any, methodName:any, desc:any) {
        console.log(target)
        console.log(methodName)
        console.log(desc)

        target.run = function() {
            console.log('run')
        }

        //modify the decoration method getData
        //1. save current method
        var oMethod = desc.value;

        desc.value = function(...args:any[]){
            arges.map((value) => String(value));

            oMethod.apply(this, args)
        }
    }
}

class HttpClient{
    public apiUrl:string | undefined
    contructor() {
        this.apiUrl = "before modifed apiUrl"
    }

    @logMethod('http://baidu.com')
    getData() {
        console.log(this.apiUrl)
    }
}

the order of different type of decorations
attribute > method > method parameter > class
~~~
### Type copy
~~~
type Copy<T> = {
    [key in keyof T]: T[key]
}

interface Person {
    name: string
    age: number
}

type Chinese = Copy<Person>
~~~
