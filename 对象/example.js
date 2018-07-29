var myObject = {
    a: 2
}

myObject.a = 3

myObject.a;
myObject.a // 3

Object.defineProperty(myObject, 'a', {
    value: 2,
    writable: true,
    configurable: false,
    enumerable: true
})

myObject.a // 2

Object.defineProperty(myObject, 'a', {
    value: 3,
    writable: false,
    enumerable: false,
    configurable: true
}) //  TypeError