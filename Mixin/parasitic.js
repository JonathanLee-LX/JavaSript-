// 寄生继承
 function Vehicle() {
     this.enginee = 1;
 }

 Vehicle.prototype.ignition = function () {
     console.log("Turning on my engine.");
 }

 Vehicle.prototype.drive = function () {
     this.ignition();
     console.log("Steering and moving forward.");
 }

 // 寄生类
 function Car() {
     // 首先，car是一个Vehicle
     var car = new Vehicle();
     // 接着我们队car进行定制
     car.wheels = 4;
     // 保留Vehicle的drive方法，如果后面需要用到
     var vehDrive = car.drive;
     car.drive = function () {
        vehDrive.call(this);
        console.log(
            "Rolling on all " + this.wheels + "wheels!"
        )
        return car;
     };
 }

 var myCar = new Car();
 myCar.drive();

 // Turning on my engine.
 // Steering and moving forward!
 // Rolling on all wheels!