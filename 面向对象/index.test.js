const getObjectKeys = require('./index')
// import getObjectKeys from './index'
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
describe('test my Object.keys function', () => {
    const p = new Person()
    console.log(getObjectKeys)
    expect(getObjectKeys(p)).toEqual(Object.keys(p))
})