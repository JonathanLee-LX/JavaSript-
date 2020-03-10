"use strict";
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    /**
     * getName 获取name
     */
    Person.prototype.getName = function () {
        return this.name;
    };
    /**
     * getAge 获取age
     */
    Person.prototype.getAge = function () {
        return this.age;
    };
    return Person;
}());
var p = new Person('lixiang', 24);
p.getAge();
p.getName();
HTMLFormControlsCollection;
