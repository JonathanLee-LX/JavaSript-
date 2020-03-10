import { curry } from '../index'

it('curry function can combined all arguments', () => {
  var add = function(...args) {
    return args.reduce((initial, cur) => {
      return initial + cur
    }, 0)
  }

  var curriedAdd = curry(add, 1, 2)
  var result = curriedAdd(3, 4)

  expect(result).toBe(10)
})
