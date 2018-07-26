function Vehicles() {
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
            "Rolling on all " + this.wheels + " wheels!"
        )
    }
    return car
}

var myCar = new Car()
myCar.drive()
