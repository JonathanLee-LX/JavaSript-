// await后面接同步语句
const awaitWithPrimitive = async () => {
    console.log('aaaa')
    const a = await 2;
    console.log(a) // 2
    const b = await {};
    console.log(b) // {}
}

const syncFunc = () => {
    let a = 1
    // while(a < 1000000000000){
    //     a++;
    // }
    console.log('sync function go.')
}

awaitWithPrimitive()
syncFunc()
