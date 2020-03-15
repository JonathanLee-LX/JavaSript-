// save origin Promise
const _Promise = Promise

export default function Promise(callback) {
  this._queue = []
  this._data = void 0
  this._status = 'pending'
  // 如果callback是一个PromiseX的实例对象，将该对象的带调用队列加入到this对象的调用队列中
  if (callback instanceof Promise) {
    this._queue = callback._queue
  } else {
    // callback不能立即执行，需要先把promise链准备好
    process.nextTick(() => {
      callback(this.resolve.bind(this), this.reject.bind(this))
    })
  }
}

/**
 * invoker执行_queue中等待执行的函数
 * @param {*} { onFulfilled, onRejected, onFinally }
 */
var invoker = function({ onFulfilled, onRejected, onFinally }) {
  if (this._status === 'resolved' && onFulfilled) {
    try {
      this._data = onFulfilled(this._data)
      this._status = 'resolved'
    } catch (error) {
      this._data = error
      this._status = 'rejected'
    }
  } else if (this._status === 'rejected' && onRejected) {
    try {
      this._data = onRejected(this._data)
      this._status = 'resolved'
    } catch (error) {
      this._data = error
      this._status = 'rejected'
    }
  }
  onFinally && onFinally()
}

Promise.prototype.resolve = function(res) {
  this._data = res
  this._status = 'resolved'
  this._queue.forEach(invoker.bind(this))
}

Promise.prototype.reject = function(error) {
  this._data = error
  this._status = 'rejected'
  this._queue.forEach(invoker.bind(this))
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.status === 'success') {
    onFulfilled()
  } else if (this.status === 'error') {
    onRejected()
  } else {
    this._queue.push({ onFulfilled, onRejected })
  }
  return new Promise(this)
}

Promise.prototype.catch = function(onRejected) {
  this._queue.push({ onRejected })
  return new Promise(this)
}

Promise.prototype.finally = function(onFinally) {
  this._queue.push({ onFinally })
  return new Promise(this)
}

Promise.race = function(...fns) {
  var sum = 0
  var flag = 'pending'
  return new Promise(function(resolve, reject) {
    fns.forEach(fn => {
      new Promise(fn)
        .then(res => {
          if (flag === 'pending') {
            flag = 'resolved'
            resolve(res)
          }
        })
        .catch(err => {
          sum++
          console.error(err)
          if (sum >= fns.length) {
            reject(err)
          }
        })
    })
  })
}

Promise.all = function(...fns) {
  // 用来记录完成的次数
  var sum = 0
  return new Promise(function(resolve, reject) {
    var resList = []
    fns.forEach((fn, i) => {
      new Promise(fn)
        .then(res => {
          resList[i] = res
          sum++
          // 如果sum等于fns.length,说明所有函数都已经完成了
          if (sum === fns.length) {
            resolve(resList)
          }
        })
        .catch(err => {
          // 如果有一个promise的状态为rejected，那么就将整个调用reject掉
          reject(err)
        })
    })
  })
}

Promise.resolve = function(res) {
  return new Promise(function(resolve, reject) {
    resolve(res)
  })
}

Promise.reject = function(error) {
  return new Promise((resolve, reject) => {
    reject(error)
  })
}
