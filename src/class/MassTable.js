import mass from '../periodictable';

const MASS_TO_KILOGRAM = 1.660539040;
const SOLAR_MASS = 1.9891 * Math.pow(10,30);
const SOLAR_RADIUS = 5;

class MassTable {
  static get solarMass () {
      return SOLAR_MASS;
  }

  static get solarRadius () {
    return SOLAR_RADIUS;
  }

  static getElements () {
    return mass;
  }

  static getRandomElement() {
    let availableElements = Object.keys(mass);
    return availableElements[Math.round(Math.random() * (availableElements.length-1))];
  }

  static generateComposition(elements) {
    let total = Object.keys(elements).reduce((current, next) =>{
      return current + elements[next];
    } ,0);

    let getNewElement = () => {
      let element = this.getRandomElement();

      if (elements[element]) {
        return getNewElement();
      }

      return element;
    }

    let elementsLength = Object.keys(elements).length;
    let maxAvailableElements = 30;

    while (total < 100 && elementsLength < maxAvailableElements) {

        let element = getNewElement();
        let amount = Math.random() / (10000 * mass[element]);

        elements[element] = amount;
        elementsLength++;
        total += amount;
    }

    return elements;
  }

  static fromSolar (multiplier) {
    return SOLAR_MASS * multiplier;
  }

  static toSolar (mass) {
    return mass / SOLAR_MASS;
  }

  static matterWeight (matter) {
    return this.total(this.getWeights(matter.elements));
  }

  static getWeights (elements) {
    let names = Object.keys(elements);

    return names.map((name) => {
      return this.numberToWeight(name, elements[name]);
    });
  }

  static total(weights) {
    return weights.reduce((current, next) => {
      return current + next;
    }, 0)
  }

  static getMass(element) {
    return mass[element] * MASS_TO_KILOGRAM;
  }

  static numberToWeight(element, count) {
    return this.getMass(element) * count;
  }

  static weightToNumber(element, weight) {
    return weight / this.getMass(element);
  }
}

export default MassTable;
