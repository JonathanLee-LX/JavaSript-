const co = require('..')

function* gen() {
  var a, b
  a = yield new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000)
  })
  b = yield Promise.resolve(2)
  return a + b
}

const error = new Error('error happend')

function* genError() {
  yield new Promise(function (resolve, reject) {
    setTimeout(() => reject(error), 1000)
  })
}

describe('test myCo', () => {
  it('can right invoker generator function ', (done) => {
    co(gen).then(res => {
      expect(res).toBe(3)
      done()
    })
  })
  it('can right handle error', async () => {
    expect.assertions(1)
    try {
      await co(genError)
    } catch (e) {
      expect(e).toBe(error)
    }
  })
})