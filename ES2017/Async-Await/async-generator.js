'use strict';

var testAsync = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var a;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return Promise.resolve(2);

                    case 2:
                        a = _context.sent;

                        console.log('go');

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function testAsync() {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { 
    return function () { 
        var gen = fn.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            function step(key, arg) {
                try { 
                    var info = gen[key](arg);
                    var value = info.value; 
                } catch (error) {
                    reject(error);
                    return;
                } 
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function (value) {
                        step("next", value);
                    }, function (err) {
                        step("throw", err); 
                    }); 
                }
            }
            return step("next");
            });
        };
    }

testAsync();