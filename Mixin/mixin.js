// 显示混入

function mixin(souceObj, targetObj) {
    for(var key in sourceObj) {
        // 只会混入targetObj不存在的属性
        if(!(key in targetObj)) {
            targetObj[key] = souceObj[key];
        }
    }
}