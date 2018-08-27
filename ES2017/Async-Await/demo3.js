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