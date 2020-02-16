//check if the brackets are closed correctly
function areBracketsClosed(randomString) {
    if (randomString.length<=1) return false;
    const stack = [];
    const dictionaryListOne = ['{', '[', '('];
    const dictionaryListTwo = ['}', ']', ')'];
    const splittedCharactors = randomString.split('');
    let result = true;
    for (let i = 0; i < splittedCharactors.length; i++) {
        const charactor = splittedCharactors[i];
        if (dictionaryListOne.includes(charactor)) {
            stack.push(charactor);
        } else {
            const index = dictionaryListTwo.findIndex((item) => item === charactor);
            const topCharactor = stack.pop();
            if (topCharactor != dictionaryListOne[index]) {
                result = false;
                break;
            }
        }
    }
    return result && !stack.length > 0;
}

const example1 = '((([[[]]])))';
const example2 = '(]';
const result = areBracketsClosed(example2);
console.log(result);

//you get 6,5,4,3,2,1 six numbers inserted into stack, what's the right seqence of getting out of the stack for each number
// A.5 4 3 6 1 2
// B.4 5 3 2 1 6
// C.3 4 6 5 2 1  answer is c, need 5 came out first
// D.2 3 4 1 5 6

class Stack {
    items = [];

    push(element) {
        this.items.push(element)
    }

    pop() {
        return this.items.pop()
    }

    peek() {
        return this.items[this.items.length - 1]
    }

    isEmpty() {
        return this.items.length === 0
    }

    size() {
        return this.items.length
    }

    toString() {
        var resultString = '';
        for (let i = 0; i < this.items.length; i++) {
            resultString += this.items[i] + ' '
        }
        return resultString
    }
}

let newStack = new Stack()