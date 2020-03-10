"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var modal_1 = __importDefault(require("./modal"));
var toggle_dialog_1 = __importDefault(require("./toggle-dialog"));
var toggle = new toggle_dialog_1.default();
var opt = (function () {
    return {
        width: 100,
        height: 200,
        mixins: toggle,
    };
})();
var modal = new modal_1.default(opt);
modal.toggleDialog();
console.log(modal.showDialog);
modal.toggleDialog();
console.log(modal.showDialog);
