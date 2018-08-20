import React, { Component } from 'react';
import Map from '../components/Map';


class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Neighborhood Map</h1>
      </div>
      <section>
        <Map />
      </section>
    );
  }
}

export default App;
