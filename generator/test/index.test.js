import co from '../'

describe('test myCo', () => {
  function* gen() {
    var a, b
    a = yield new Promise(function(resolve, reject) {
      setTimeout(() => resolve(1), 1000)
    })
    b = yield Promise.resolve(2)
    return a + b
  }

  const error = new Error('error happend')

  function* genError() {
    yield new Promise(function(resolve, reject) {
      reject(error)
    })
  }

  it('can right invoker generator function ', done => {
    co(gen).then(res => {
      expect(res).toBe(3)
      done()
    })
  })

  it('can right execute async task', done => {
    expect.assertions(1)
    const asyncFn = function*() {
      const value = yield Promise.resolve(2)
      return value
    }
    co(asyncFn).then(res => {
      expect(res).toBe(2)
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
