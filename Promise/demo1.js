var PromiseX = require('./promiseX');
var fs = require('fs');

var readFile = function (url) {
    return new PromiseX(function (resolve, reject) {
        fs.readFile(url, 'utf8', function(err, data) {
            if(err) reject(err);
            resolve(data);
        })
    });        
}

readFile('./promiseX.js').then(function(res) {
    console.log(res.substr(0, res.indexOf('\n')));
}).catch(function (err) {
    console.error(err);
}).then(res => {
    console.log(res);
})

console.log('start read file...');
