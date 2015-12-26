import React from 'react';
import Matter from '../class/Matter';
import MassTable from '../class/MassTable';
import Utils from '../class/Utils';
import Circle from '../class/Circle';

class Star extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      mass: Math.random() * (Math.random() * 40)
    };

    this.state.radius = MassTable.solarRadius * Math.pow(this.state.mass, 0.8);
    this.state.color = Utils.KelvinToRgb((Math.random()*1500) * this.state.mass );

    this.reservedSpace = new Circle(0,0, this.state.radius * 50);
  }

  componentDidMount() {
    this.generateComposition();
  }

  generateComposition() {
    this.setState({
      composition: Matter.fromWeight(MassTable.generateComposition({
          H: Math.random()*5 + 88,
          He: Math.random()*5
        }), MassTable.fromSolar(this.state.mass))
      });
  }

  getRadius () {
    return MassTable.solarRadius * Math.pow(this.state.mass, 0.8);
  }

  onClick = () => {
    console.log(this.state.composition);
  }

  render () {
    let r = this.state.radius;
    this.reservedSpace.center = {x: this.props.position.x, y: this.props.position.y};

    let style = {
      position: 'absolute',
      top: this.props.position.y,
      left: this.props.position.x,
      backgroundColor: 'rgb('+this.state.color+')',
      width: this.state.radius * 2 +'px',
      height: this.state.radius * 2 +'px',
      marginLeft: -this.state.radius +'px',
      marginRight: -this.state.radius +'px'
    };

    return (<div className="star" style={style} onClick={this.onClick}></div>);
  }
}

export default Star;
