const axios = require('axios') ;

const fetchFile = (fileURL) => {
    return axios.get(fileURL)
            .then(res => {
                return res
            }).catch(err => {
                // console.error(err)
            })
}

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

// const fetchFileWithAsync = async () => {
//     try {
//         const a = await fetchFile('http://localhost:3000/a.txt')
//         console.log(a.data)
//         const b = await fetchFile('http://localhost:3000/b.txt')
//         console.log(b.data)
//         const c = await fetchFile('http://localhost:3000/c.txt')
//         console.log(c.data)
//     } catch (error) {
//         console.error(error)
//     }
// }

const fetchFileWithAsync = async () => {
<<<<<<< HEAD
    try {
        const a = await fetchFile('http://localhost:3000/a1.txt')
        console.log(a.data)
        const b = await fetchFile('http://localhost:3000/b.txt')
        console.log(b.data)
        const c = await fetchFile('http://localhost:3000/c.txt')
        console.log(c.data)
    } catch (error) {
        console.log('error')
=======
    const promiseA = fetchFile('http://localhost:3000/a.txt')
    const promiseB = fetchFile('http://localhost:3000/b.txt')
    const promiseC = fetchFile('http://localhost:3000/c.txt')
    // const { a, b, c } = await Promise.all(promiseA, promiseB, promiseC)
    // [promiseA, promiseB, promiseC].forEach(async promise => {
    //     await promise
    // })
    for (promise of [promiseA, promiseB, promiseC]){
        console.log((await promise).data)
>>>>>>> 45762d3d4360577090908c821ced2cd048b4c95c
    }
}

// fetchFileWithPromise()

fetchFileWithAsync()


