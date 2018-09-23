const somePromise = () => {
    return new Promise((resolve, reject) => {
    })
}

const awaitWithPromise = async () => {
    await somePromise()
    console.log('go...')
}

awaitWithPromise()
    // .then(data => {
    //     console.log(data)
    // })
    // .catch(err => {
    //     console.log(err)
    // })