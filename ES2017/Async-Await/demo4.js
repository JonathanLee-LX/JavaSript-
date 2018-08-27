const axios  = require('axios')

const fetchFile = () => {
    return fetch(url).then(res => {

    }).catch(err => {
        console.error
    })
}

const fetchFiles = (urls) => {
    const responseList = urls.map(async url => {
        return await axios.get(url)
    })
    console.log(responseList)
    responseList.forEach(res => {
        console.log(res.data)
    })
}

const urls = ['http://localhost:3000/a.txt', 'http://localhost:3000/b.txt', 'http://localhost:3000/c.txt']

fetchFiles(urls)