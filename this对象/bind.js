// ES2015的Function类性的原型对象上增加了一个新方法bind
// 在不支持ES2015的环境上，可以使用下面这段代码进行兼容

// Function.prototype.bind: (thisArg[, arg1[, arg2, [...]]]): boundFunction =>  {}
// thisArg: any 该方法需要绑定的this对象,可以是任何类型的值，包括null，undefined和基本类型
// arg1: any,arg2: any 预先传入该绑定方法的参数
// 返回值boundFunction为绑定了该thisArg参数和预先填入了arg1，arg等参数的一个新的包装函数

function bind(oThis) {
    if (typeof this !== 'function') {
        throw new Error('This object is not a function.')
    }
    var fToBind = this,
        fNOP = function () {},
        aArgs = Array.prototype.slice.call(arguments, 1),
        fBound = function () {
            return fToBind.apply(
                this instanceof fNOP &&
                oThis ? this : oThis,
                Array.prototype.concat(aArgs, arguments)
            )
        }
    // 为了让返回的函数对象也能正确的使用new来实例化对象
    fNOP.prototype = this.prototype
    fBound.prototype = new fNOP()
    return fBound
}

// module.exports = bind
export default bind