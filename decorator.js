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
var State = /** @class */ (function () {
    function State() {
        this.name = 1;
    }
    __decorate([
        observered
    ], State.prototype, "name");
    return State;
}());
var state = new State();
state.name = 2;
