"use strict";
exports.__esModule = true;
var Armor = /** @class */ (function () {
    function Armor() {
        this.energy = 100;
    }
    Armor.prototype.fly = function () {
        var consumption = 10;
        if (this.energy - consumption < 0)
            return this.handleNotEnoughEnergy();
        console.log('flying...');
        this.energy -= consumption;
    };
    Armor.prototype.lasing = function () {
        var consumption = 40;
        if (this.energy - consumption < 0)
            return this.handleNotEnoughEnergy();
        console.log('lasing...');
        this.energy -= consumption;
    };
    Armor.prototype.handleNotEnoughEnergy = function () {
        console.log('have not enough energy to use this skill');
    };
    Armor.prototype.getEnergy = function () {
        return this.energy;
    };
    Armor.prototype.setEnergy = function (energy) {
        this.energy = energy;
    };
    return Armor;
}());
var Javis = /** @class */ (function () {
    function Javis() {
    }
    Javis.prototype.showAR = function () {
        console.log('show Augmented reality...');
    };
    Javis.prototype.analyzeEnemy = function () {
        console.log('analyzing enemy...');
    };
    return Javis;
}());
var Tony = /** @class */ (function () {
    function Tony(name) {
        this.energy = 100;
        this.name = name;
    }
    Tony.prototype.getEnergy = function () {
        throw new Error('Method not implemented.');
    };
    Tony.prototype.setEnergy = function (energy) {
        throw new Error('Method not implemented.');
    };
    Tony.prototype.fly = function () {
        throw new Error('Method not implemented.');
    };
    Tony.prototype.lasing = function () {
        throw new Error('Method not implemented.');
    };
    Tony.prototype.showAR = function () {
        throw new Error('Method not implemented.');
    };
    Tony.prototype.analyzeEnemy = function () {
        throw new Error('Method not implemented.');
    };
    Tony.prototype.handleNotEnoughEnergy = function () {
        throw new Error('Method not implemented.');
    };
    Tony.prototype.sayName = function () {
        console.log(this.name);
    };
    return Tony;
}());
exports["default"] = Tony;
function applyMixins(baseClass, mixinClasses) {
    mixinClasses.forEach(function (mixin) {
        Object.getOwnPropertyNames(mixin.prototype).forEach(function (name) {
            baseClass.prototype[name] = mixin.prototype[name];
        });
    });
}
applyMixins(Tony, [Armor, Javis]);
