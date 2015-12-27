/**
 * {
 * 		h: 1,
 * 		o: 2
 * }
 */
import MassTable from './MassTable';

class Matter {
  constructor (elements) {
    this.elements = {};
    this.setElements(elements);
  }

  setElements (elements) {
    for (let i in elements) {
      this.elements[i] = elements[i];
    }
  }

  toMass(mass) {
    let total = this.getMass();
    let multiplier = mass / total;

    this.getElements().forEach((element) => {
      this.elements[element] = this.elements[element] * multiplier;
    });

    return this.getMass();
  }

  getArray() {
    return this.getElements().map((element) => {
      return {
        name: element,
        value: this.elements[element]
      }
    });
  }

  /**
   * get list of elements
   * @return {[type]} [description]
   */
  getElements () {
    return Object.keys(this.elements);
  }

  /**
   * calculate total number of elements
   * @return {[type]} [description]
   */
  getMass () {
    return this.getElements().reduce((current, element) =>{
      return current + this.elements[element];
    } ,0)
  }

  /**
   * get percentage of elements by count
   * @return {[type]} [description]
   */
  getPercentages() {
    let total = this.getMass();
    let elements = {};

    this.getElements().forEach((element) => {
      elements[element] = this.elements[element] / total;
    });

    return elements;
  }

  getMaximumAvailable (composition) {
    let compositionElements = Object.keys(composition);
    let maximumAmounts = compositionElements.map((element) => {
      return this.elements[element] ? Math.floor(this.elements[element] / composition[element]) : 0;
    });

    let maxAvailableAmount = maximumAmounts.reduce((current, next) => {
      return next < current ? next : current;
    }, Infinity);

    return maxAvailableAmount;
  }

  /**
   * extract some sort of substance based on atomic things
   * {
   * 	h:6,
   * 	ra:12
   * }
   * @param  {[type]} composition [description]
   * @return {[type]}             [description]
   */
  extract (composition, amount) {
    let compositionElements = Object.keys(composition);
    let maxAvailableAmount = this.getMaximumAvailable(composition);

    if (maxAvailableAmount > 0) {
      let extractedElements = {};
      let extractedAmount = amount > maxAvailableAmount ? maxAvailableAmount : amount;

      compositionElements.forEach((element) => {
        extractedElements[element] = this.take(element, extractedAmount * composition[element]);
      });

      return extractedElements;
    } else {
      return {};
    }
  }

  /**
   * add elements
   * @param {[type]} element [description]
   * @param {[type]} amount  [description]
   */
  add(element, amount) {
    this.elements[element] = this.elements[element] ? this.elements[element] + amount : amount;
  }

  /**
   * take number of elements
   * @param  {[type]} element [description]
   * @param  {[type]} amount  [description]
   * @return {[type]}         [description]
   */
  take(element, amount) {
    if (this.elements[element]){
      let available = this.elements[element] >= amount ? amount : this.elements[element];
      this.elements[element] -= available;
      return available;
    } else {
      return 0;
    }
  }


  /**
   * merge another matter object
   * @param  {[type]} matter [description]
   * @return {[type]}        [description]
   */
  merge (matter) {
    let matterElements = matter.getElements();

    matterElements.forEach((element) => {
      this.elements[element] = this.elements[element] ? this.elements[element] + matter.elements[element] : matter.elements[element];
    });
  }

}

export default Matter;
