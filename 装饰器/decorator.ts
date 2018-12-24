function observered(obj: any, member: string) {
    let val = obj[member];
    Object.defineProperty(obj, member, {
        get() {
            return val;
        },
        set(newVal) {
            if(newVal === val) return;
            val = newVal;
            console.log(`${member} value has been changed.`);
        }
    })
    return val;
}

function loadAble(key: string) {
    return function (obj: any, member: string) {
        let fn = obj[member];
        return function(...args: any[]) {
            obj[key] = true;
            console.log(obj[key]);
            try {
                fn.apply(obj, args);
            } catch (error) {
                console.error(error);                
            }
            obj[key] = false;
            console.log(obj[key]);
        }
    }
}

class State {
    // @observered 
    name = 1;
    
    isLoading: boolean = false;
    
    @loadAble('isLoading')
    fetchData() {
        console.log('fetch data end..')
    }
}
    
const data = new State();

data.name = 2;
console.log(data.isLoading)
data.fetchData();