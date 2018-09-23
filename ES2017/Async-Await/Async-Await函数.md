# Async函数
`Async`函数是ES2017中新添加的一个新特性，主要是为了让更好的书写异步函数。
## 为什么会有Async？我们先尝试解决下面这个问题。
> 有三个资源`a.txt`, `b.txt`和`c.txt`,我们需要使用`axios`按顺序获取这三个文件中的数据。
## 使用Promise实现
``` javascript
const axios = require('axios') ;

const fetchFile = (fileURL) => {
    return axios.get(fileURL)
            .then(res => {
                return res
            }).catch(err => {
                console.error(err)
            })
}

// 使用Promise
const fetchFileWithPromise = () => {
    fetchFile('http://localhost:3000/a.txt')
    .then(res => {
        console.log(res.data)
        fetchFile('http://localhost:3000/b.txt')
        .then(res => {
            console.log(res.data)
            fetchFile('http://localhost:3000/c.txt')
            .then(res => {
                console.log(res.data)
            }).catch(err => {
                console.error(err)
            })
        }).catch(err => {
            console.error(err)
        })
    }).catch(err => {
        console.error(err)
    })
}

// 使用Async函数
const fetchFileWithAsync = async () => {
    try {
        const a = await fetchFile('http://localhost:3000/a.txt')
        console.log(a.data)
        const b = await fetchFile('http://localhost:3000/b.txt')
        console.log(b.data)
        const c = await fetchFile('http://localhost:3000/c.txt')
        console.log(c.data)
    } catch (error) {
        console.error(error)
    }
}

fetchFileWithPromise()

fetchFileWithAsync()

```
## Async使用方法
在函数声明前添加一个关键字`async`就可以让声明一个`async`函数了，如：
``` javascript
async function foo(){
    /****/
}
```
也可以用在匿名函数和箭头函数中，像这样：
```js
const foo = async function (){
    /******/
}

const bar = async () => {
    /******/
}
```
在`async`函数中可以使用一个关键字`await`,`await`关键字可以是`Promise`对象或者是原始类型的值。
- 后面跟`Promise`对象时，当前函数的会进行等待并交出当前js线程执行权，在`Promise`对象的状态变为`fulfilled`或`rejected`状态时，会再次执行，如果`Promise`状态一值为`pending`，那么`await`后面的代码就永远不会执行。
```js
const somePromise = () => {
    return new Promise((resolve, reject) => {
        resolve()
    })
}

const awaitWithPromise = async () => {
    await somePromise()
}
```
- `await`后面接的是**非Promise对象**时，该值会变成`Promise.resolve(someValue)`被返回，导致后面的代码被异步执行，所以不要在非`Promise`前面加`await`。
``` js
// await后面接基本数据类型
const awaitWithPrimitive = async () => {
    const a = await 1;
    console.log(a) // 1
    const b = await {};
    console.log(b) // {}
}

const syncFunc = () => {
    console.log('sync function has go.')
}

awaitWithPrimitive()
syncFunc()

// 'sync function has go' 
// 1
// {}

```

## 错误处理
在`Promise`中我们可以通过`catch`方法捕获处理错误异常，在`async`中我们可以通过使用`try catch`语句来处理错误和异常。
例如：
``` js
const throwError = () => {
    return Promise.reject(new Error('Catch error in async function'))
}

const asyncWithError = async () => {
    try {
        await throwError()
    } catch (error) {
        console.error(error)
    }
}

asyncWithError()
// Error: Catch error in async function.
```
在我们需要执行多个异步操作的时候，如果这几个异步互不影响的时候，我们就可以将他们都放入到一个`try catch`块中。

## Async函数的实现
`Async`函数是一个语法糖，它是由*ES6*中的`Promise`对象和`Generator`函数实现的。

``` js
async function fn(args) {
    /*
    *
    */
}

function fn(args) {
    return spawn(function* () {
        /*
        *
        */
    })
}

```

``` js
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
    return 'end'
}

spawn(go).then((x) => {
    console.log(x)
})
```
