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

const fetchFileWithAsync = async () => {
    try {
        const a = await fetchFile('http://localhost:3000/a1.txt')
        console.log(a.data)
        const b = await fetchFile('http://localhost:3000/b.txt')
        console.log(b.data)
        const c = await fetchFile('http://localhost:3000/c.txt')
        console.log(c.data)
    } catch (error) {
        console.log('error')
    }
}

// fetchFileWithPromise()

fetchFileWithAsync()


