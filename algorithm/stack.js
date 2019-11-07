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