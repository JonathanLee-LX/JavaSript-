var a = function () {
  console.log('a')
}

var b = function () {
  console.log('b')
}

var c = a
var d = b

var m = new Map([
  [a, b]
])
var wm = new WeakMap([
  [a, b]
])

// m.get(a)()
// a = null
// setTimeout(() => m.get(c)(), 100)

wm.get(a)()
a = null
setTimeout(() => wm.get(c)(), 1000)