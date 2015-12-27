import React from 'react';
import Matter from '../class/Matter';
import MassTable from '../class/MassTable';
import Utils from '../class/Utils';
import Circle from '../class/Circle';
import Planet from './Planet';

class Star extends React.Component {
  constructor (props) {
    super(props);

    let matter = new Matter(MassTable.generateComposition({H: Math.random()*5 + 88,He: Math.random()*5}));
    matter.toMass(MassTable.fromSolar(Math.random() * (Math.random() * 40)));

    this.state = {
      composition: matter,
      mass: matter.getMass(),
      planets: []
    };
console.log(this.state);
    this.state.radius = MassTable.massToSolarRadius(this.state.mass);
    this.state.color = Utils.KelvinToRgb((Math.random()*1500) * MassTable.toSolar(this.state.mass));
    this.reservedSpace = new Circle(0,0, this.state.radius * 50);
  }

  componentDidMount() {
    this.generatePlanets();
  }

  generatePlanets() {
    let count = Math.random()*30;
    let planets = [];

    while (planets.length < count) {
      planets.push({
        radius: Math.random() * this.state.radius,
        position: Math.random() * 360,
        distance: this.getOutermostPlanetOrbit() + (Math.random()  * this.state.radius * 100 + (this.state.radius * 10))
      });
    }

    this.setState({
      planets: planets
    });
  }

  getPlanetOrbits (planets) {
    planets = planets ? planets : this.state.planets;
    return planets.map((planet) => {
      return planet.distance;
    });
  }

  getOutermostPlanetOrbit(planets) {
    return this.getPlanetOrbits().reduce((current, next) => {
      return current > next ? current : next;
    }, 0);
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
            time={MassTable.getRotationTime(MassTable.toSolar(this.state.mass), planet.distance)}
            position={planet.position}
            key={planetIndex}></Planet>
        })}
      </div>
    );
  }
}

export default Star;
