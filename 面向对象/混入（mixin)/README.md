# 混入(Mixin)
## 寄生继承
显示混入模式的一种变体被称为“寄生继承”，它既是显性的又是隐性的，主要的推广者是 **Douglas Crockford**。
下面是它的工作原理：
``` js
function Vehicles () {
    this.engines = 1
}
Vehicles.prototype.ignition = function () {
    console.log("Turning on my engine.")
}
Vehicles.prototype.drive = function () {
    this.ignition()
    console.log("Steering and moving forward!")
}
function Car() {
    var car = new Vehicles()
    car.wheels = 4
    var vehDrive = car.drive
    car.drive = function () {
        // extract 
        vehDrive.call(this)
        console.log(
            "Rolling on all" + this.wheels + "wheels!"
        )
    }
    return car
}

var myCar = new Car()
myCar.drive()
// Turning on my engine.
// Steering and moving forward!
// Rolling on all 4 wheels!
```
在这个例子中，有一个**Vehicles**构造函数和一个**Car**构造函数，在**Car**中先实例化了一个**Vehicles**对象，然后可以为这个对象添加新的属性，或者也可以覆盖之前的属性，相当于复制了一份Vehicles的定义，在根据需求制定了一些新的定义，然后通过`vehDrive`保存了`car.drive`的方法，然后覆盖现有的`car.drive`的定义，并在新的定义中通过`call`方法调用以前定义的方法，然后返回这个符合对象构建的实例。