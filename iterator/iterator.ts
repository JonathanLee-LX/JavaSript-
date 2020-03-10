function createIterator<T>(): Iterable<T> {
  let i = 0
  return {
    [Symbol.iterator]: function() {
      return {
        next: function() {
          return i < 4
            ? {
                value: i++,
                done: false,
              }
            : {
                value: i,
                done: true,
              }
        },
      }
    },
  }
}

var iterator = createIterator()
console.log([...iterator])
console.log({ ...iterator })
