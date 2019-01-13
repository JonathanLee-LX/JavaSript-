// [3, 4]: 5
const fs = require('fs');
const path = require('path');
let times = 0;

function calculate(x, y) {
    let value;
    if(hasCached([x, y])) {
        value = getCache([x, y]);
    } else {
        value = Math.hypot(x, y);
        cache([x, y], value);
        times++;
    }
    return value;
}

const map = new Map();
function cache(keys, value) {
    const key = keys.sort().toString();
    map.set(key, value);
}

function hasCached(keys) {
    const key = keys.sort().toString();
    return map.has(key);
}

function getCache(keys) {
    const key = keys.sort().toString();
    return map.get(key);
}

function generateData() {
    const data = [];
    let i = 1000000;
    while(i--) {
        const x = Math.floor(Math.random() * 5) + 1;
        const y = Math.floor(Math.random() * 5) + 1;
        data.push([x, y]);
    }
    return data;
}

function getAllFile() {
    let files;
    fs.readdir('../fp', (err, items) => {
        files = items.map(item => path.resolve(__dirname, item));
    })
}

// const data = generateData();
// const start = Date.now();
// const result = data.map(item => {
//     return calculate(...item);
// })
// const end = Date.now();
// console.log(`spend ${end - start} ms.`);

// console.log(`total caculate ${times}.`);

getAllFile();