var PromiseX = require('./promiseX');

console.log(PromiseX.resolve('hello promiseX.').then(res => {
        console.log(res)
    }));
