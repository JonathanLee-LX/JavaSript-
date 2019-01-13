"use strict";
exports.__esModule = true;
var Modal = /** @class */ (function () {
    function Modal(opt) {
        this.width = 100;
        this.height = 80;
        this.width = opt.width;
        this.height = opt.height;
        if (opt.mixins)
            this.initMixins(opt);
    }
    Modal.prototype.initMixins = function (opt) {
        // 初始化需要混入的属性和方法
        // const keys = Object.keys(opt.mixins)
        // keys.forEach(key => {
        //     if(this[key]) return
        //     this[key] = opt.mixins[key]
        // })
        for (var key in opt.mixins) {
            if (this[key])
                return;
            this[key] = opt.mixins[key];
        }
    };
    return Modal;
}());
exports["default"] = Modal;
