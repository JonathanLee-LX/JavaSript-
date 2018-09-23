function spawn(genF) {
    return new Promise(function (resolve, reject) {
        const gen = genF();
        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch (e) {
                return reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(function (v) {
                step(function () { return gen.next(v); });
            }, function (e) {
                step(function () { return gen.throw(e); });
            });
        }
        step(function () { return gen.next(undefined); });
    });
}

function* go() {
    let x;
    x = yield 'go'
    console.log(x)
    x = yield new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Two seconds passed')
        }, 2000)
    })
    console.log(x)
    return 'end'
}

spawn(go).then((x) => {
    console.log(x)
})