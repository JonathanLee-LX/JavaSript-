// await后面接同步语句
const awaitWithPrimitive = async () => {
    const a = await 2;
    console.log(a) // 2
    const b = await {};
    console.log(b) // {}
}

const syncFunc = () => {
    console.log('sync function go.')
}

awaitWithPrimitive()
syncFunc()
