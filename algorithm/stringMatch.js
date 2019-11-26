function getHashCode(char) {
    let prime = 1315423911;
    for (var i = 0; i < char.length; i++) {
        prime ^= prime << 5 + char.charCodeAt(i) + prime >> 2;
    }
    return (prime & 0x7FFFFFFF);
}

console.log(getHashCode('supeng'))

function findAllPlaces(char, pattern) {
    const allAppearedIndex = [];
    const transformedCode = getHashCode(pattern);
    for (var i = 0; i < char.length - pattern.length; i++) {
        let currentCode = getHashCode(char.slice(i, i + pattern.length));
        if (currentCode === transformedCode) {
            allAppearedIndex.push(i)
        }
    }
    return allAppearedIndex;
}

const charactors = 'supengsupneg';
const result = findAllPlaces(charactors, 'n');
console.log(result)


