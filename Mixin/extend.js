const _ = (function () {
    const extend = (baseClass, mixin) => {
        const keys = Object.keys(mixin);
        keys.forEach(key => {
            if(!baseClass.hasOwnProperty(key)) {
                baseClass[key] = mixin[key];
            }
        });
    };
    return {
        extend,
    };
})();
var myMixins = {
    moveUp: function () {
        console.log("move up");
    },
    moveDown: function () {
        console.log("move down");
    },
    stop: function () {
        console.log("stop! in the name of love");
    },
    moveLeft: function () {
        console.log('move left in mixin');
    }
};

function carAnimator() {
    this.moveLeft = function () {
        console.log("move left");
    };
}

function personAnimator() {
    this.moveRandomly = function () { /** */ };
}

_.extend(carAnimator.prototype, myMixins);
_.extend(personAnimator.prototype, myMixins);

var myAnimator = new carAnimator();

myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();
