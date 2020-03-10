import bind from '../bind'
// const bind = require('../bind')

Function.prototype.bind = bind

describe('test bind function', done => {
  test('will return i\'m IronMan', () => {
    const name = 'Tony Stack'

    const IronMan = {
      name: 'Iron Man'
    }

    function sayName() {
      return this.name
    }

    const bSayName = sayName.bind(IronMan)

    setTimeout(() => {
      expect(bSayName()).toBe(IronMan.name)
      done()
    }, 0)
  })
})