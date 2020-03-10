"use strict";
var Dialog = /** @class */ (function () {
    function Dialog() {
        this.showDialog = false;
    }
    Dialog.prototype.closeDialog = function () {
        this.showDialog = false;
    };
    Dialog.prototype.openDialog = function () {
        this.showDialog = true;
    };
    return Dialog;
}());
var Table = /** @class */ (function () {
    function Table() {
        this.data = [];
    }
    Table.prototype.editRow = function () {
        console.log('edit row');
    };
    Table.prototype.deleteRow = function () {
        console.log('delete row');
    };
    return Table;
}());
var TableDialog = /** @class */ (function () {
    function TableDialog() {
        this.data = [];
        this.showDialog = false;
        console.log('this table data is ' + this.data + 'and this dialog is' + ("" + (this.showDialog ? 'visible' : 'hidden')));
    }
    return TableDialog;
}());
var applyMixinHelper = function (targetClass, baseClasses) {
    baseClasses.forEach(function (baseClass) {
        Object.getOwnPropertyNames(baseClass)
            .forEach(function (prop) {
            targetClass[prop] = baseClass[prop];
        });
    });
    return targetClass;
};
applyMixinHelper(TableDialog, [Table, Dialog]);
var tableDialog = new TableDialog();
