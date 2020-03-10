// 使用原型链实现继承
const _instanceof = require('./instanceof')

function SuperType() {
  this.prop = true
}

SuperType.prototype.getSuperValue = function () {
  return this.prop
}

function SubType() {
  this.prop = false
}

SubType.prototype = new SuperType()

SubType.prototype.getSubValue = function () {
  return this.prop
}

const sub = new SubType()
console.log(sub instanceof SubType) // true
console.log(sub instanceof SuperType) // true
console.log(_instanceof(sub, SubType))
console.log(_instanceof(sub, SuperType))