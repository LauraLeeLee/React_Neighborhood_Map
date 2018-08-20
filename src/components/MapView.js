import React, { Component } from 'react';
import { mapStyle } from '../data/mapStyle.js';

class MapView extends Component {
  const map = new google.maps.Map(document.getElementsById('map'), {
    center: {
      lat: 41.5916799,
      lng: 13.2427548
    },
    zoom: 13,
    styles: styles,
    gestureHandling: 'greedy',
    mapTypeControl: false
  });

  render() {
    return (
      <div id="map">
      </div>
    );
  }
}

export default MapView;
