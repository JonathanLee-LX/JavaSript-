var PromiseX = require('./promiseX');

PromiseX.race(function (resolve, reject) {
    setTimeout(() => {
        reject(new Error(500));
    }, 500)
}, function (resolve, reject) {
    setTimeout(() => {
        reject(new Error(2500));
    }, 2500)
}).then(res => {
    console.log(res);
}).catch(err => console.error(err));