# Async函数
`Async`函数是ES2017中新添加的一个新特性，主要是为了让更好的书写异步函数。
## 为什么会有Async？我们先尝试解决下面这个问题。
> 有三个资源`a.txt`, `b.txt`和`c.txt`,我们需要使用`axios`按顺序获取这三个文件中的数据。
## Promise并没有直接解决回调嵌套和易读性的问题
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

fetchFileWithPromise()
```
## 使用`Async`书写**貌似同步**形式的异步代码
``` js
const axios = require('axios') ;

const fetchFile = (fileURL) => {
    return axios.get(fileURL)
            .then(res => {
                return res
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

fetchFileWithAsync()
```

## Async函数的使用方式
在函数声明前添加一个关键字`async`，就可以把这个函数声明为一个`async`函数如：
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
### `await`关键字
在`async`函数中可以使用一个关键字`await`,`await`关键字可以是`Promise`对象或者是原始类型的值。
- 后面跟`Promise`对象时，当前函数的会进行等待并交出当前js线程执行权，在`Promise`对象的状态变为`fulfilled`或`rejected`状态时，会再次执行。
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
- `await`后面接的是原始类型的值时，该值会变成`Promise.resolve(someValue)`被返回，会使得这段代码在下一次事件循环中才被调用，所以不要在非`Promise`对象前面加`await`。
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
在`Promise`中我们可以通过`catch`方法捕获处理错误异常，在`async`中我们可以通过使用`try catch`语句来处理错误和异常。在我们需要执行多个异步操作的时候，我们就可以将他们都放入到一个`try catch`块中。

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
开头我们讲到的一个例子是按顺序继发地获取三个资源，如果这三个资源并没有联系，它们可以同时发起请求获取，使用`async`我们需要怎么做？
``` js
const fetchFileWithAsync = async () => {
    const promiseA = fetchFile('http://localhost:3000/a.txt')
    const promiseB = fetchFile('http://localhost:3000/b.txt')
    const promiseC = fetchFile('http://localhost:3000/c.txt')
    const { a, b, c} = await Promise.all(promiseA, promiseB, promiseC)   
}

```
