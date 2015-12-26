import React from 'react';
import Rectangle from '../class/Rectangle';

class ViewCanvas extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      scale: 0.5,
      x: 0,
      y: 0
    };


    this._ondrag = false;
    this._lastevent = false;
  }

  componentDidMount () {
    let view = this.refs.view;


    view.addEventListener('mousedown', this.startViewDrag);
    view.addEventListener('mousemove', this.viewDrag);
    document.addEventListener('mouseup', this.endViewDrag);
    document.addEventListener('mousewheel', this.viewZoom);
  }

  getPointer (event) {
    return {
      x: event.pageX,
      y: event.pageY
    };
  }

  startViewDrag = (event) => {
    this._ondrag = true;
    this._lastevent = this.getPointer(event);
  }

  viewDrag = (event) => {
    if (this._ondrag) {
      let pointer = this.getPointer(event);

      let sx =  pointer.x - this._lastevent.x;
      let sy =  pointer.y - this._lastevent.y;

      this.move(sx,sy);

      this._lastevent = pointer;
    }
  }

  endViewDrag = (event) => {
    this._ondrag = false;
  }

  viewZoom = (event) => {
    let scale = this.state.scale + (this.state.scale * event.wheelDeltaY / 4800);

    let pointer = this.getPointer(event);
    let currentScale = this.state.scale;
    let newScale = scale;

    let ix = (pointer.x - this.state.x) / currentScale;
    let iy = (pointer.y - this.state.y) / currentScale;

    let nx = ix * newScale;
    let ny = iy * newScale;

    let newPosition = {
     x: (ix + (pointer.x - ix) - nx),
     y: (iy + (pointer.y - iy) - ny),
     scale: newScale
    };

    this.setState(newPosition);
  }

  getDifference (view, view2) {
    return {
      x: view2.x - view.x,
      y: view2.y - view.y
    };
  }

  getScaledSize (view, scale) {
    return {
      x: view.x * scale,
      y: view.y * scale
    };
  }

  move (x,y) {
    this.setPosition(this.state.x + (x || 0), this.state.y + (y || 0));
  }

  setPosition (x,y) {
    this.setState({
      x: (x || 0),
      y: (y || 0),
    });
  }

  setScale (scale) {
    this.setState({
      scale: scale
    });
  }

  render () {
    let style = {
      transformOrigin: '0 0 0',
      transform: 'translate3d('+this.state.x+'px, '+this.state.y+'px, 0) scale3d('+this.state.scale+','+this.state.scale+',1)'
    };

    let stars = this.props.stars;

    return (
      <div className="view" ref="view">
        <div className="canvas" style={style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ViewCanvas;
