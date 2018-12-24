const PromiseX = require('../promiseX');

test('test then function', (done) => {
    const cb = data => {
        expect(data).toBe('Hello PromiseX');
        done();
    };
    new PromiseX((resolve, reject) => {
        setTimeout(() => resolve('Hello PromiseX'), 100);
    }).then(cb);
});

test('test catch function', done => {
    const cb = err => {
        expect(err).toBe('error happend');
        done();
    };
    new PromiseX((resolve, reject) => {
        setTimeout(() => reject('error happend'), 100);
    }).catch(cb);
});

test('test finally function', done => {
    const cb = jest.fn(() => {
        expect(cb).toBeCalledTimes(1);
        done();
    });
    const isSuccess = Math.random > .5;
    new PromiseX((resolve, reject) => {
        setTimeout(() => {
            isSuccess ? resolve('success') : reject('failed');
        }, 100)
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    }).finally(cb);
});

test('test PromiseX.all function', done => {
    const cb = res => {
        expect(res).toEqual([1000, 2000, 4000, 3000, 500, 2500]);
        done();
    };
    PromiseX.all(
        function (resolve, reject) {
            setTimeout(() => {
                resolve(1000);
            }, 1000);
        },
        function (resolve, reject) {
            setTimeout(() => {
                resolve(2000);
            }, 2000)
        },
        function (resolve, reject) {
            setTimeout(() => {
                resolve(4000);
            }, 4000)
        },
        function (resolve, reject) {
            setTimeout(() => {
                resolve(3000);
            }, 3000)
        },
        function (resolve, reject) {
            setTimeout(() => {
                resolve(500);
            }, 500)
        },
        function (resolve, reject) {
            setTimeout(() => {
                resolve(2500);
            }, 2500)
        }).then(cb);
});

test('test PromiseX.race function', done => {
    const time1 = 500;
    const time2 = 1000;
    const cb = (res) => {
        expect(res).toBe(time1);
        done();
    }
    PromiseX.race(
        (resolve, reject) => {
            setTimeout(() => {
                resolve(time1);
            }, time1)
        }, (resolve, reject) => {
            setTimeout(() => {
                resolve(time2);
            }, time2)
        }).then(cb);
});

test('test PromiseX.resolve function', done => {
    const result = 100;
    const cb = res => {
        expect(res).toBe(result);
        done();
    }
    PromiseX.resolve(result).then(cb);
})