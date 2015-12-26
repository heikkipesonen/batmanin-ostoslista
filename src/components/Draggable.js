import _ from 'lodash';
import React from 'react';
import Rectangle from '../class/Rectangle';

const DEFAULT_OPTIONS = {
  x: true,
  y: true,
  tensionX: 0.3,
  tensionY: 0.3,
  maxX: 0,
  maxY: 0,
  minX: 0,
  minY: 0
};

class Draggable extends React.Component {
  constructor (props, options) {
    super(props);

    this._lastEvent = null;

    this.options = _.defaults({}, options, DEFAULT_OPTIONS);

    this.state = {
      dragging: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      animation: 0
    };

    this.bounds = new Rectangle(this.state);
  }

  componentWillUpdate () {
    this.bounds.x = this.state.x;
    this.bounds.y = this.state.y;
  }

  componentDidMount () {
    this._element = this.refs.draggable;
    this._element.addEventListener('touchstart', this._onDragStart);
    this._element.addEventListener('touchmove', this._onDrag);
    this._element.addEventListener('touchend', this._onDragEnd);

    this._element.addEventListener('mousedown', this._onDragStart);
    document.addEventListener('mousemove', this._onDrag);
    document.addEventListener('mouseup', this._onDragEnd);

    this.bounds.state.width = this._element.offsetWidth;
    this.bounds.state.height = this._element.offsetHeight;

    this._element.addEventListener('transitionend', this.animationComplete);
  }

  componentWillUnmount () {
    this._element.removeEventListener('touchstart', this._onDragStart);
    this._element.removeEventListener('touchmove', this._onDrag);
    this._element.removeEventListener('touchend', this._onDragEnd);

    this._element.removeEventListener('mousedown', this._onDragStart);
    document.removeEventListener('mousemove', this._onDrag);
    document.removeEventListener('mouseup', this._onDragEnd);

    this._element.removeEventListener('transitionend', this.animationComplete);
  }

  animationComplete = () => {
    this.setState({
      animation: 0
    });
  }

  getCursor (evt) {
    let pointer = evt.touches ? evt.touches[0] : evt;
    return {
      x: pointer.pageX,
      y: pointer.pageY
    };
  }

  getEventData (evt) {
    let pointer = this.getCursor(evt);
    return {
      x: pointer.x,
      y: pointer.y,
      timeStamp: evt.timeStamp,
      vx: this._lastEvent ? (pointer.x - this._lastEvent.x) / (evt.timeStamp - this._lastEvent.timeStamp) : 0,
      vy: this._lastEvent ? (pointer.y - this._lastEvent.y) / (evt.timeStamp - this._lastEvent.timeStamp) : 0
    }
  }

  setLastEvent (evt) {
    this._lastEvent = this.getEventData(evt);
  }

  _onDragStart = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    this.onDragStart(evt);
  }

  onDragStart (evt) {
    this.setState({
      dragging: true
    });

    this.setLastEvent(evt);
  }

  _onDrag = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    this.onDrag(evt);
  }

  onDrag (evt) {
    if (this.state.dragging){
      let currentEvent = this.getEventData(evt);
      let stepx = currentEvent.x - this._lastEvent.x;
      let stepy = currentEvent.y - this._lastEvent.y;


      if ((this.state.x + stepx > this.options.maxX && stepx > 0) || (this.state.x + stepx < this.options.minX && stepx < 0)){
        stepx = stepx * this.options.tensionX;
      }

      if ((this.state.y + stepy > this.options.maxY && stepy > 0) || (this.state.y + stepy < this.options.minY && stepy < 0)){
        stepy = stepy * this.options.tensionY;
      }

      this.setState({
        x: this.options.x ? this.state.x + stepx : this.state.x,
        y: this.options.y ? this.state.y + stepy : this.state.y,
        animation: 0
      });

      this.setLastEvent(evt);
    }
  }

  _onDragEnd = (evt) => {
    if (this.state.dragging) {
      this.onDragEnd(evt);
    }
  }

  onDragEnd (evt) {
    this.setState({
      dragging: false
    });
  }

  getElementStyle () {
    return {
      transform : 'translate3d(' + this.state.x + 'px, ' + this.state.y + 'px, 0)',
      transitionDuration : this.state.animation ? this.state.animation + 'ms' : ''
    };
  }

  render () {
    return (<div className="draggable" style={this.getElementStyle} ref="draggable">{this.props.children}</div>);
  }
}

export default Draggable;
