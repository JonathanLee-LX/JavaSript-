var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function observered(obj, member) {
    var val = obj[member];
    Object.defineProperty(obj, member, {
        get: function () {
            return val;
        },
        set: function (newVal) {
            if (newVal === val)
                return;
            val = newVal;
            console.log(member + " value has been changed.");
        }
    });
    return val;
}
function loadAble(key) {
    return function (obj, member) {
        var fn = obj[member];
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            obj[key] = true;
            console.log(obj[key]);
            try {
                fn.apply(obj, args);
            }
            catch (error) {
                console.error(error);
            }
            obj[key] = false;
            console.log(obj[key]);
        };
    };
}
var State = /** @class */ (function () {
    function State() {
        // @observered 
        this.name = 1;
        this.isLoading = false;
    }
    State.prototype.fetchData = function () {
        console.log('fetch data end..');
    };
    __decorate([
        loadAble('isLoading')
    ], State.prototype, "fetchData");
    return State;
}());
var data = new State();
data.name = 2;
console.log(data.isLoading);
data.fetchData();
