import React from 'react';
import Matter from '../class/Matter';
import MassTable from '../class/MassTable';
import Utils from '../class/Utils';
import Circle from '../class/Circle';
import Planet from './Planet';

class Star extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      mass: Math.random() * (Math.random() * 40),
      planets: []
    };

    this.state.radius = MassTable.solarRadius * Math.pow(this.state.mass, 0.8);
    this.state.color = Utils.KelvinToRgb((Math.random()*1500) * this.state.mass );

    this.reservedSpace = new Circle(0,0, this.state.radius * 50);
  }

  componentDidMount() {
    this.generateComposition();
    this.generatePlanets();

  }

  generatePlanets() {
    let count = Math.random()*30;
    let planets = [];

    while (planets.length < count) {
      planets.push({
        radius: Math.random() * this.state.radius,
        position: Math.random() * 360,
        distance: Math.random()  * this.state.radius * 100 + (this.state.radius * 10)
      });
    }

    this.setState({
      planets: planets
    });
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

    return (
      <div className="star" style={style} onClick={this.onClick}>
        {this.state.planets.map((planet, planetIndex) => {
          return <Planet
            origin={planet.distance - this.state.radius}
            distance={planet.distance}
            radius={planet.radius}
            time={MassTable.getRotationTime(this.state.mass, planet.distance)}
            position={planet.position}
            key={planetIndex}></Planet>
        })}
      </div>
    );
  }
}

export default Star;
