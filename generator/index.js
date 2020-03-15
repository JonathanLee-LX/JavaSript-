/**
 * @description 接收一个generator函数，myCo会自动执行该generator函数中的代码
 *  并将执行结果通过Promise对象返回
 * @param {*} gen 生成器函数
 * @returns
 */
export default function co(gen) {
  var g = gen()

  function next(g, prev) {
    var { value, done } = g.next(prev)

    if (value instanceof Promise)
      return value
        .then(res => {
          if (!done) return next(g, res)
          return res
        })
        .catch(err => {
          throw err
        })

    if (!done) return next(g, value)

    return Promise.resolve(value)
  }

  return next(g)
}
