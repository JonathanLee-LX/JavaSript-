function PromiseX (callback) {
    this.__queue__ = [];
    this.__res__ = void 0;
    this.__status__ = 'pending';
    // 如果callback是一个PromiseX的实例对象，将该对象的带调用队列加入到this对象的调用队列中
    if(callback instanceof PromiseX) {
        this.__queue__ = callback.__queue__;
    }else {
        callback(this.resolve.bind(this), this.reject.bind(this)); 
    }
}

var handle = function ({ onSuccess, onError }) {
    if (this.__status__ === 'resolved') {
        if(!onSuccess) {
            return new PromiseX(this);
        }
        try {
            this.__res__ = onSuccess(this.__res__);
            this.__status__ = 'resolved';
        } catch (error) {
            this.__res__ = error;
            this.__status__ = 'rejected';
        }
    } else if(this.__status__ === 'rejected') {
        try {
            this.__res__ = onError(this.__res__);
            this.__status__ = 'resolved';
        } catch (error) {
            this.__res__ = error;
            this.__status__ = 'rejected';
        }
    }
}

PromiseX.prototype.resolve = function (res) {
    this.__res__ = res;
    this.__status__ = 'resolved';
    this.__queue__.forEach(handle.bind(this));
}

PromiseX.prototype.reject = function (error) {
    this.__res__ = error;
    this.__status__ = 'rejected';
    this.__queue__.forEach(handle.bind(this));
}

PromiseX.prototype.then = function(onSuccess, onError) {
    if(this.status === 'success') {
        onSuccess();
    }else if(this.status === 'error') {
        onError();
    }else {
        this.__queue__.push({onSuccess, onError});
    }
    return new PromiseX(this);
}

PromiseX.prototype.catch = function(onError) {
    this.__queue__.push({onError});
    return new PromiseX(this);
}

var callback = function (resolve, reject) {
    setTimeout(function () {
        // if(Math.random() > .5)
        // resolve('Hello Promise!!!');
        // else
        reject(new Error('some error happend..'))
    }, 1000);
}

var p = new PromiseX(callback);
p.then(function (res) {
    console.log(res);
}, function (err) {
    console.error(err);
    throw new Error('some error happend again ...');
}).catch(err => {
    console.error(err);
    return 'everything goes well.'
}).then(function (res) {
    console.log(res);
}).catch(function (err) {
    console.error(err);
}).then(function (res) {
    console.log(res);
});
// p.then(function(res) {
//     console.log(res);
//     return 'Hello PromiseX ---2';
// }, function(error) {
//     console.error(error);
//     throw new Error('some error happend again...')
// }).then(function(res) {
//     console.log(res);
//     throw new Error('some error happend again aaaaaa...')
// }, function (err) {
//     console.error(err);
//     throw new Error('some error happend again again...')
// }).then(function(res) {
//     console.log(res);
// }, function(err) {
//     console.error(err);
// });
// 'Hello PromiseX'
//  'Hello PromiseX --2'
// 'some error happend again aaaaaaaaa...'