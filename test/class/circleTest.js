import Circle from '../../src/class/Circle.js';

describe('circle', () =>{
  let circle;

  beforeEach(() => {
      circle = new Circle(0,0,100);
  });

  it('should set state', () => {
    circle.setState({cat: 'dog'});
    expect(circle.state.cat).to.equal('dog');
  });

  it('should init circle at 0,0 with radius of 100', () => {
    expect(circle.radius).to.equal(100);
  });

  it('should move circle from 0,0 to 20,20', () => {
    circle.center = {x:20, y:20};

    expect(circle.center.x).to.equal(20);
    expect(circle.center.y).to.equal(20);
  });

  it('should move circle from 0,0 to 20,20 and move the left,top, right and bottom', () => {
    circle.center = {x:20, y:20};

    expect(circle.center.x).to.equal(20);
    expect(circle.center.y).to.equal(20);

    expect(circle.left).to.equal(-80);
    expect(circle.top).to.equal(-80);
    expect(circle.bottom).to.equal(120);
    expect(circle.right).to.equal(120);
  });

  it('should contain point within radius', () => {
    let point = {x: 20, y: 20};
    expect(circle.contains(point)).to.equal(true);
  });

  it('should not contain point outside of radius', () => {
    let point = {x: 101, y: 101};
    expect(circle.contains(point)).to.equal(false);
  });

  it('should contain point within radius, when moved', () => {
    circle.center = {x:600, y: 600};
    let point = {x: 623, y: 650};
    expect(circle.contains(point)).to.equal(true);
  });

  it('should not contain point outside of radius, when moved', () => {
    circle.center = {x:600, y: 600};
    let point = {x: 699, y: 699};
    expect(circle.contains(point)).to.equal(false);
  });

  it('should intersect with another circle', () => {
    let anotherCircle = new Circle(100,0,100);
    expect(circle.intersects(anotherCircle)).to.equal(true);
  });

  it('should intersect with another circle when offset', () => {
    let anotherCircle = new Circle(70,70,100);
    expect(circle.intersects(anotherCircle)).to.equal(true);
  });

  it('should not intersect with another circle when offset outside of radius', () => {
    let anotherCircle = new Circle(142,142,100);
    expect(circle.intersects(anotherCircle)).to.equal(false);
  });
});
