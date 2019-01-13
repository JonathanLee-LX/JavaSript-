'use strict'
exports.__esModule = true
var iron_man_1 = require('../iron-man')
describe('iron man', function() {
    var ironMan = new iron_man_1['default']('tony Stack')
    test('test energy percent', function() {
        expect(ironMan.getEnergy()).toBe(100)
    })
    test('test flying', function() {
        var energy = ironMan.getEnergy()
        ironMan.fly()
        expect(ironMan.getEnergy()).toBe(energy - 10)
    })
    test('test lasing', function() {
        var energy = ironMan.getEnergy()
        ironMan.lasing()
        expect(ironMan.getEnergy()).toBe(energy - 40)
    })
    test('test handle have not enough energy', function() {
        var mockFn = jest.fn(ironMan.lasing)
        expect(mockFn.bind(ironMan)).toBeCalled()
    })
})
