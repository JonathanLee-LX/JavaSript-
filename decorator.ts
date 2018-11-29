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

class State {
    @observered name = 1;
}
    
const state = new State();

state.name = 2;