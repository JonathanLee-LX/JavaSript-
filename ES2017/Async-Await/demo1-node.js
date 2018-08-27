const fs = require('fs')

const ReadFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if(err) reject(err)
            resolve(data)            
        })
    })
}

const ReadAllFileWithPromise = () => {
    ReadFile('public/a.txt').then(data => {
        console.log(data)
        ReadFile('public/b.txt').then(data => {
            console.log(data)
            ReadFile('public/c.txt').then(data => {
                console.log(data)
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

ReadAllFileWithPromise()

const ReadAllFileWithAsync = async () => {
    try {
        const a = await ReadFile('public/a.txt')
        console.log(a + 'async')
        const b = await ReadFile('public/b.txt')
        console.log(b + 'async')
        const c = await ReadFile('public/c.txt')
        console.log(c + 'async')
    } catch (err) {
        console.error(err)
    }
}

ReadAllFileWithAsync()

