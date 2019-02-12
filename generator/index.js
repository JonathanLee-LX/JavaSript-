/**
 * @description 接收一个generator函数，myCo会自动执行该generator函数中的代码
 *  并将执行结果通过Promise对象返回
 * @param {*} gen 生成器函数
 * @returns
 */
function myCo(gen) {
  var g = gen()

  function next(g, prev) {
    var {
      value,
      done
    } = g.next(prev)
    // assume value is a Promise
    if (done) return Promise.resolve(value)
    return value.then(res => {
      return next(g, res)
    }).catch(err => {
      throw new Error(err)
    })
  }
  return next(g)
}

module.exports = myCo