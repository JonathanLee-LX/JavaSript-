import ToggleDialog from './toggle-dialog'

export default class Modal {

    width = 100

    height = 80

    constructor(opt) {
        this.width = opt.width
        this.height = opt.height
        if(opt.mixins) this.initMixins(opt)
    }

    initMixins(opt) {
        // 初始化需要混入的属性和方法
        // const keys = Object.keys(opt.mixins)
        // keys.forEach(key => {
        //     if(this[key]) return
        //     this[key] = opt.mixins[key]
        // })
        for(let key in opt.mixins){
            if(this[key]) return
            this[key] = opt.mixins[key]
        }

    }
}