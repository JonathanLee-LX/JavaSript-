import Modal from './modal'
import ToggleDialog from './toggle-dialog'

const source = new ToggleDialog();

console.log(source)

const opt = (() => {
    return {
        width: 100,
        height: 200,
        mixins: source
    }
})();

const modal: any = new Modal(opt);

modal.toggleDialog()
console.log(modal.showDialog)
modal.toggleDialog()
console.log(modal.showDialog)