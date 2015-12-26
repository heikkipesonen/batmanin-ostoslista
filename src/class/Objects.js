class Objects {
  constructor () {
    this.items = [];
  }

  add (item) {
    this.items.push(item);
  }

  remove (item) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  intersects (object) {
    return this.items.filter((item) => {
      return item !== object && item.bounds.intersects(object.bounds);
    });
  }
}


export default new Objects();
