class Person {
    private name: string;
    private age: number;
    /**
     * getName 获取name
     */
    public getName() {
        return this.name;
    }
    /**
     * getAge 获取age
     */
    public getAge() {
        return this.age;
    }
    
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const p = new Person('lixiang', 24);
p.getAge();
p.getName();
HTMLFormControlsCollection

