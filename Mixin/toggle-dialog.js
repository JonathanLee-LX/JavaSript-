"use strict";
exports.__esModule = true;
var ToggleDialog = /** @class */ (function () {
    function ToggleDialog() {
        this.showDialog = false;
    }
    ToggleDialog.prototype.toggleDialog = function () {
        this.showDialog = !this.showDialog;
    };
    return ToggleDialog;
}());
exports["default"] = ToggleDialog;
