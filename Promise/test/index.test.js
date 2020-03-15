import Promise from '../'

describe('PromiseX test suites', () => {
  test('test then function', done => {
    const cb = data => {
      expect(data).toBe('Hello PromiseX')
      done()
    }
    new Promise((resolve, reject) => {
      setTimeout(() => resolve('Hello PromiseX'), 100)
    }).then(cb)
  })

  test('test catch function', done => {
    const cb = err => {
      expect(err).toBe('error happend')
      done()
    }
    new Promise((resolve, reject) => {
      setTimeout(() => reject('error happend'), 100)
    }).catch(cb)
  })

  test('test finally function', done => {
    const cb = jest.fn(() => {
      expect(cb).toBeCalledTimes(1)
      done()
    })
    const isSuccess = Math.random > 0.5
    new Promise((resolve, reject) => {
      setTimeout(() => {
        isSuccess ? resolve('success') : reject('failed')
      }, 100)
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(cb)
  })

  test('test PromiseX.all function', done => {
    const cb = res => {
      expect(res).toEqual([100, 200, 300, 400, 500, 600])
      done()
    }
    Promise.all(
      function(resolve, reject) {
        setTimeout(() => {
          resolve(100)
        }, 100)
      },
      function(resolve, reject) {
        setTimeout(() => {
          resolve(200)
        }, 200)
      },
      function(resolve, reject) {
        setTimeout(() => {
          resolve(300)
        }, 300)
      },
      function(resolve, reject) {
        setTimeout(() => {
          resolve(400)
        }, 400)
      },
      function(resolve, reject) {
        setTimeout(() => {
          resolve(500)
        }, 500)
      },
      function(resolve, reject) {
        setTimeout(() => {
          resolve(600)
        }, 600)
      }
    ).then(cb)
  })

  test('test PromiseX.race function', done => {
    const time1 = 500
    const time2 = 1000

    const cb = res => {
      expect(res).toBe(time1)
      done()
    }

    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(time1)
      }, time1)
    })

    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(time2)
      }, time2)
    })

    Promise.race(p1, p2).then(cb)
  })

  test('test PromiseX.resolve function', done => {
    const result = 100
    const cb = res => {
      expect(res).toBe(result)
      done()
    }
    Promise.resolve(result).then(cb)
  })

  test('should throw error', done => {
    const error = new Error('test Promise.reject function ')

    Promise.reject(error).catch(err => {
      expect(err).toBe(error)
      done()
    })
  })
})
