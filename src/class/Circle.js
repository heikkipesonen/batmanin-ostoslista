class Circle {
  constructor (centerx, centery, radius) {
    this.state = {
      radius: radius,
      x: centerx,
      y: centery
    };
  }

  setState (state) {
    for (let i in state) {
      this.state[i] = state[i];
    }
  }

  get radius () {
    return this.state.radius;
  }

  set radius (radius) {
    this.setState({
      radius: radius
    });
  }

  get center () {
    return {
      x: this.state.x,
      y: this.state.y
    };
  }

  set center (point) {
    this.setState(point);
  }

  get left () {
    return this.state.x - this.state.radius;
  }

  set left (position) {
    this.setState({
      x: position - this.state.radius
    });
  }

  get top () {
    return this.state.y - this.state.radius;
  }

  set top (position) {
    this.setState({
      y: position - this._radius
    });
  }

  get width () {
    return this.state.radius * 2;
  }

  get height () {
    return this.state.radius * 2;
  }

  get bottom () {
    return this.top + this.height;
  }

  get right () {
    return this.left + this.width;
  }

  contains (point) {
    return this.radius >= Math.sqrt(Math.pow(this.center.x - point.x,2) + Math.pow(this.center.y - point.y, 2));
  }

  intersects (circle) {
    let distx = this.center.x - circle.center.x;
    let disty = this.center.y - circle.center.y;
    return this.radius + circle.radius >= Math.sqrt(Math.pow(distx, 2) + Math.pow(disty, 2));
  }
}

export default Circle;
