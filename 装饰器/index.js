function decorator(el) {
    return {
        ...el,
        finisher(Class) {
            Class.bar = 2;
            return wrap(Class);
        },
        extras: [{
            key: "initializer",
            placement: "static",
            initializer() {
                this.foo = 2;
            },
        }, {
            kind: "finisher",
            
        }]
    }
}