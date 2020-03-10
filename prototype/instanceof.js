module.exports = function _instanceof(obj, fn) {
  if (typeof fn !== 'function') throw new TypeError('fn must be a function')
  if (typeof obj !== 'object') throw new TypeError('obj must be a object')
  if (obj === null) throw new TypeError('obj cannot be null')
  while (obj.__proto__) {
    if (obj.__proto__ === fn.prototype) return true
    obj = obj.__proto__
    if (obj === Object.prototype) return false
  }
  return false
}