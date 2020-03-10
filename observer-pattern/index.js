"use strict";
var TARGET = null;
var Stock = /** @class */ (function () {
    function Stock(price) {
        this.price = price;
        this.observerList = [];
    }
    Stock.prototype.add = function (observer) {
        this.observerList.push(observer);
    };
    Stock.prototype.remove = function () {
        return this.observerList.pop();
    };
    Stock.prototype.notify = function () {
        this.observerList.forEach(function (observer) {
            observer.update();
        });
    };
    ;
    Stock.prototype.has = function (observer) {
        return this.observerList.indexOf(observer) !== -1
            ? true
            : false;
    };
    Stock.prototype.getPrice = function () {
        if (TARGET && !this.has(TARGET)) {
            this.add(TARGET);
        }
        return this.price;
    };
    Stock.prototype.setPrice = function (price) {
        if (this.price === price)
            return;
        this.price = price;
        this.notify();
    };
    return Stock;
}());
var SObserver = /** @class */ (function () {
    function SObserver(stock) {
        this.stock = stock;
    }
    SObserver.prototype.update = function () {
        console.log('stock price has changed to ' + this.stock.getPrice() + '$');
        TARGET = null;
    };
    return SObserver;
}());
var stock = new Stock(10);
var stockObserver = new SObserver(stock);
// stock.add(stockObserver);
TARGET = stockObserver;
stockObserver.update();
TARGET = null;
stock.setPrice(20);
stock.setPrice(999);
