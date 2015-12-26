import React from 'react';
import Draggable from './Draggable';
import Objects from '../class/Objects';

class Converter extends Draggable {
  constructor(props) {
    let options = {
      maxX: Infinity,
      maxY: Infinity,
      minX: -Infinity,
      minY: -Infinity
    };

    super(props, options);
  }

  componentDidMount () {
    super.componentDidMount();
    Objects.add(this);
  }

  onDragEnd () {
    super.onDragEnd();
  }

  render () {
    return (<div ref="draggable" style={this.getElementStyle()} className="converter">{this.props.children}</div>);
  }
}

export default Converter;
