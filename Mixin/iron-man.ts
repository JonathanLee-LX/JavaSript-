class Armor {
  energy = 100

  fly() {
    const consumption = 10
    if (this.energy - consumption < 0) return this.handleNotEnoughEnergy()
    console.log('flying...')
    this.energy -= consumption
  }

  lasing() {
    const consumption = 40
    if (this.energy - consumption < 0) return this.handleNotEnoughEnergy()
    console.log('lasing...')
    this.energy -= consumption
  }

  handleNotEnoughEnergy() {
    console.log('have not enough energy to use this skill')
  }

  getEnergy() {
    return this.energy
  }

  setEnergy(energy: number) {
    this.energy = energy
  }
}

class Javis {
  showAR() {
    console.log('show Augmented reality...')
  }

  analyzeEnemy() {
    console.log('analyzing enemy...')
  }
}

export default class Tony implements Armor, Javis {
  getEnergy(): number {
    throw new Error('Method not implemented.')
  }
  setEnergy(energy: number): void {
    throw new Error('Method not implemented.')
  }
  energy: number = 100

  fly(): void {
    throw new Error('Method not implemented.')
  }

  lasing(): void {
    throw new Error('Method not implemented.')
  }
  showAR(): void {
    throw new Error('Method not implemented.')
  }
  analyzeEnemy(): void {
    throw new Error('Method not implemented.')
  }

  handleNotEnoughEnergy(): void {
    throw new Error('Method not implemented.')
  }

  name: string

  sayName() {
    console.log(this.name)
  }

  constructor(name: string) {
    this.name = name
  }
}

function applyMixins(baseClass: any, mixinClasses: any[]) {
  mixinClasses.forEach(mixin => {
    Object.getOwnPropertyNames(mixin.prototype).forEach(name => {
      baseClass.prototype[name] = mixin.prototype[name]
    })
  })
}

applyMixins(Tony, [Armor, Javis])
