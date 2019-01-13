"use strict";
exports.__esModule = true;
var modal_1 = require("./modal");
var toggle_dialog_1 = require("./toggle-dialog");
var source = new toggle_dialog_1["default"]();
console.log(source);
var opt = (function () {
    return {
        width: 100,
        height: 200,
        mixins: source
    };
})();
var modal = new modal_1["default"](opt);
modal.toggleDialog();
console.log(modal.showDialog);
modal.toggleDialog();
console.log(modal.showDialog);
