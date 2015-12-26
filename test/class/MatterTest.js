import Matter from '../../src/class/Matter.js';

describe('Matter', () => {
  let matter;
  let composition = {
    H: 200,
    O: 200,
    Fe: 200
  };

  beforeEach(() => {
    matter = new Matter(composition);
  });

  it('should initialize with composition', () => {
    expect(matter.elements.H).to.equal(200);
    expect(matter.elements.O).to.equal(200);
  });

  it('should copy composition to itself', () => {
    expect(matter.elements).not.to.equal(composition);
  });

  it('should get element keys', () => {
    let elements = matter.getElements();
    let keys = Object.keys(composition);

    let contains = keys.every((key) => {
      return elements.indexOf(key) > -1;
    });

    expect(contains).to.equal(true);
  });

  it('should get total amount of elements', () => {
    expect(matter.getTotalAmount()).to.equal(600);
  });

  it('should give percentage of elements in relation to total count', () => {
    let percentage = 1/3;
    expect(matter.getPercentages().H).to.equal(percentage);
    expect(matter.getPercentages().O).to.equal(percentage);
    expect(matter.getPercentages().Fe).to.equal(percentage);
  });

  it('should calculate maximum amount of compositions correctly regardless of compositions', () => {
    let available;

    available = matter.getMaximumAvailable({H:1,O:1,Fe:10});
    expect(available).to.equal(20);

    available = matter.getMaximumAvailable({H:1,O:1});
    expect(available).to.equal(200);

    available = matter.getMaximumAvailable({H:1});
    expect(available).to.equal(200);
  });

  it('should round down amounts if division results in fractions', () => {
    let available = matter.getMaximumAvailable({H: 13});
    expect(matter.elements.H).to.be.greaterThan(available);
  });

  it('should take matter by amount given', () => {
    let m = matter.take('H', 100);
    expect(m).to.equal(100);
    expect(matter.elements.H).to.equal(100);
  });

  it('should not take more matter than is available by amount given', () => {
    let m = matter.take('H', 1000);
    expect(m).to.equal(200);
    expect(matter.elements.H).to.equal(0);
  });

  it('should extract composition by given amounts in particle count and reduce the count of particles contained', () => {
    let m = matter.extract({H: 2, O: 1}, 90);

    expect(m.H).to.equal(180);
    expect(matter.elements.H).to.equal(20);

    expect(m.O).to.equal(90);
    expect(matter.elements.O).to.equal(110);
  });
});
