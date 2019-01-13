const _ = require('lodash');

const chunk = (input, size) => {
    return input.reduce((accu, item, idx) => {
        const temp = idx % size === 0
        ? [...accu, [item]]
        // 展开arr的0到length-2项，将length-1项与当前项组合
        : [...accu.slice(0, -1), [...accu.slice(-1)[0], item]]
        console.log(temp);
        return temp;
    }, []);
};

// const arr = [1, 2, 3, 4, 5, 6, 7];
const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
}

console.log(_.chunk(obj, 3))

// console.log(chunk(obj, 3));

/** 
 * [...[], [...[].slice(-1)[0], item]] ----> [[item]]
 * [...[[item]], [item1]] -----> [[item], [item1]]
 * [...[[item], [[item1]]]] ----> [[item], [[item1]]]
*/

// 

// const myChunk = (arr, size) => {
//     if(size <= 0) {
//         throw new Error('size cannot smaller than 0');
//     }
//     return arr.reduce((prev, cur, i) => {
//         return i % size === 0
//                 ? [...prev, cur]
//                 : [...prev.slice(0, -1), [...prev.slice(-1)[0], cur]]
//     }, [])
// }