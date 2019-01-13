import Modal from './modal'
import ToggleDialog from './toggle-dialog'

const toggle = new ToggleDialog()

const opt = (() => {
  return {
    width: 100,
    height: 200,
    mixins: toggle,
  }
})()

const modal: any = new Modal(opt)

modal.toggleDialog()
console.log(modal.showDialog)

modal.toggleDialog()
console.log(modal.showDialog)
