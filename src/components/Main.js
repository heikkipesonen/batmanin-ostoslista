require('normalize.css');
require('styles/App.scss');

import React from 'react';
// import Converter from './Converter';
import Star from './Star';
import ViewCanvas from './ViewCanvas';

class AppComponent extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      stars: []
    };

    while (this.state.stars.length < 50) {
      this.state.stars.push({
        x: (Math.random() * 100000) - 50000,
        y: (Math.random() * 100000) - 50000
      });
    }
  }

  render() {
    return (
      <div className="view">
        <ViewCanvas>
        {this.state.stars.map((star, starIndex) => {
          return <Star position={star} key={starIndex}></Star>
        })}
        </ViewCanvas>
      </div>
    );
  }
}

export default AppComponent;
