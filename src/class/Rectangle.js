class Rectangle {
  constructor (state) {
    this.state = state;
    this.scale = 1;
  }

  setState(state) {
    for (let i in state) {
      this.state[i] = state[i];
    }
  }

  move (x,y) {
    this.setPosition(this.state.x + x, this.state.y + y);
  }

  setPosition (x,y) {
    this.setState({
      x:x,
      y:y
    });
  }

  merge (rectangle) {
    this.state.x = this.state.x < rectangle.state.x ? this.state.x : rectangle.state.x;
    this.state.y = this.state.y < rectangle.state.y ? this.state.x : rectangle.state.y;
    this.right = this.right > rectangle.right ? this.right : rectangle.right;
    this.bottom = this.bottom > rectangle.bottom ? this.bottom : rectangle.bottom;
  }

  extend (x,y) {
    this.state.x = this.state.x < x ? this.state.x : x;
    this.state.y = this.state.y < y ? this.state.y : y;
    this.right = this.right > x ? this.right : x;
    this.bottom = this.bottom > y ? this.bottom : y;
  }

  scale (scalex, scaley, center) {
    let oldWidth = this.state.width;
    let oldHeight = this.state.height;

    this.state.width = this.state.width * (scalex || 1);
    this.state.height = this.state.height * (scaley || 1);

    if (center){
      this.state.x = this.state.x - (this.state.width - oldWidth)/2;
      this.state.y = this.state.y - (this.state.height - oldHeight)/2;
    }
  }

  get y () {
    return this.state.y;
  }

  get x () {
    return this.state.x;
  }

  set x (x) {
    this.state.x = x;
  }

  set y (y) {
    this.state.y = y;
  }

  get right () {
    return this.state.x + this.state.width;
  }

  set right (right) {
    this.state.width = right - this.state.x;
  }

  get bottom () {
    return this.state.y + this.state.height;
  }

  set bottom (bottom) {
    this.state.height = bottom - this.state.y;
  }

  contains (point) {
    return this.x >= point.x && this.right <= point.x && this.y >= point.y && this.bottom <= point.y;
  }

  intersects (rectangle) {
    return !(rectangle.x > this.right ||
           rectangle.right < this.x ||
           rectangle.y > this.bottom ||
           rectangle.bottom < this.y);
  }
}

export default Rectangle;
