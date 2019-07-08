# typescript-practice
typescript notes
## data types
~~~
//string number type declaration
let stringone:string
let numberone:number

//array type declaration
let arrayone:number[];
let arraytwo:Array<number>;
let arraythree:any[];

//enum type declaration
enum Flag {success=0, error=1};
const statusOne:Flag = Flag.error;
console.log(status)

//any type
const oBox:any = document.getElementById('root')
oBox.style.color = 'red;'

//compound type
let numbertwo: number | null | undefined;
numbertwo = 3;

//void type
function run():void {
    console.log('return nothing')
}

//never type
let aaa:undefined;
let bbb: null;
let ccc:never;

aaa = undefined;
bbb = null;

