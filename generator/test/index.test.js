const co = require('..')

function* gen() {
  var a, b
  a = yield new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000)
  })
  b = yield Promise.resolve(2)
  return a + b
}

describe('test myCo', () => {
  it('can right invoker generator function ', (done) => {
    co(gen).then(res => {
      expect(res).toBe(3)
      done()
    })
  })
})