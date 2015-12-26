import Alt from '../alt';
import ObjectActions from '../actions/ObjectActions';

class ObjectsStore {
  constructor () {
    this.bindListeners({
      add: ObjectActions.add
    });

    this.state = {
      objects: []
    };
  }

  add (object) {
    this.setState({
      objects: this.state.objects.push(object)
    });
  }

  intersects (object) {
    return this.objects.filter((item) => {
      return item !== object && item.bounds.intersects(object.bounds);
    });
  }
}

export default Alt.createStore(ObjectsStore, 'ObjectStore');
