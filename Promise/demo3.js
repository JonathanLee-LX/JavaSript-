var PromiseX = require('./promiseX');

PromiseX.all(function(resolve, reject) {
    setTimeout(() => {
        resolve(1000);
    }, 1000);
}, function(resolve, reject) {
    setTimeout(() => {
        resolve(2000);
    }, 2000)
},function(resolve, reject) {
    setTimeout(() => {
        resolve(4000);
    }, 4000)
},function(resolve, reject) {
    setTimeout(() => {
        resolve(3000);
    }, 3000)
},function(resolve, reject) {
    setTimeout(() => {
        resolve(500);
    }, 500)
},function(resolve, reject) {
    setTimeout(() => {
        reject(2500);
    }, 2500)
}).then(res => {
    console.log(res);
}).catch(err => console.error(err));