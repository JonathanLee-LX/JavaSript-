module.exports = Object.keys = function (obj) {
    const keys = []
    if (typeof obj !== 'object') {
        keys = []
    } else {
        for (let key in obj) {
            obj.hasOwnProperty(key) ?
                keys.push(key) :
                void 0
        }
    }
    return keys
}
//#endregion
class Person {
    constructor() {
        this.name = 'lixiang'
        this.age = 24
    }
    sayName() {
        console.log(this.name)
    }
    grow(year) {
        this.age += year
    }
}
const p = new Person()
Object.keys(p)