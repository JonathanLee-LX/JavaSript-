import IronMan from '../iron-man'

describe('iron man', () => {
  const ironMan = new IronMan('tony Stack')

  test('test energy percent', () => {
    expect(ironMan.getEnergy()).toBe(100)
  })

  test('test flying', () => {
    const energy = ironMan.getEnergy()
    ironMan.fly()
    expect(ironMan.getEnergy()).toBe(energy - 10)
  })

  test('test lasing', () => {
    const energy = ironMan.getEnergy()
    ironMan.lasing()
    expect(ironMan.getEnergy()).toBe(energy - 40)
  })

  test('test handle have not enough energy', () => {
    const mockFn = jest.fn(ironMan.lasing).bind(ironMan)
    expect(mockFn()).toBeCalled()
  })
})
