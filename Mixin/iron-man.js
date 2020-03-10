"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    Tony = __decorate([
        mixins([Armor, Javis]),
        __metadata("design:paramtypes", [String])
    ], Tony);
    return Tony;
}());
exports.default = Tony;
function mixins(source) {
    return function (target) {
        source.forEach(function (mixin) {
            Object.getOwnPropertyNames(mixin.prototype).forEach(function (name) {
                target.prototype[name] = mixin.prototype[name];
            });
        });
    };
}
var tony = new Tony('Tony Stack');
tony.fly();
tony.analyzeEnemy();
