const arr = [1, 2, 3, 4]

for (let val of arr) {
    // console.log(val) // 1, 2, 3, 4
}

for (let val in arr) {
    // console.log(val) // 0, 1, 2, 3
}

// 给想遍历的对象添加@@iterator

const obj = {
    a: 1,
    b: 2,
    c: 3
}

// obj[Symbol.iterator] = () => {
//     let o = this
//     let i = 0
//     let keys = Object.keys(obj)
//     return {
//         next: () => {
//             return {
//                 value: o[keys[i++]],
//                 done: i > keys.length - 2
//             }
//         }
//     }
// }

// Object.defineProperty(obj, Symbol.iterator, {
//     enumerable: false,
//     writable: false,
//     configurable: true,
//     value: function () {
//         let o = this
//         let i = 0
//         let keys = Object.keys(obj)
//         return {
//             next: () => {
//                 return {
//                     done: i > keys.length - 1,
//                     value: o[keys[i++]],
//                 }
//             }
//         }
//     }
// })

obj[Symbol.iterator] = function () {
    let o = this
    let i = 0
    let keys = Object.keys(obj)
    return {
        next: () => {
            return {
                done: i > keys.length - 1,
                value: o[keys[i++]],
            }
        }
    }
}

for (let val of obj) console.log(val)