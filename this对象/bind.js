if(!Function.prototype.bind){
    Function.prototype.bind = function (oThis) {
        if(typeof oThis !== 'function'){
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
}

var a = 2,
    b = function () {
        console.log(this.a)
    }
b.a = 1

