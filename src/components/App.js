import React, { Component } from 'react';
import { mapStyle } from '../data/mapStyle.js';
import  locations  from '../data/locations.js';
import scriptLoader from 'react-async-script-loader';
import PlacesList from './PlacesList.js';

class App extends Component {
  state = {
    listOn: true,
    infowindow: {},
    // locations: [locations],
  }


  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: {
            lat: 41.5916799,
            lng: 13.2427548
          },
            zoom: 13,
            styles: mapStyle,
            gestureHandling: 'greedy',
            mapTypeControl: false
          });

          // locations.map(location => {
          //   let marker = new window.google.maps.Marker({
        	// 		map: map,
        	// 		position: location.location,
        	// 		title: location.title,
        	// 		animation: window.google.maps.Animation.DROP,
        	// 		// icon: defaultIcon,
        	// 		id: location.id,
        	// 		open: false
        	// 	});
          // });

        console.log(map);
        console.log(locations);
        }
      }
      else this.props.onError()
    }

  // initMap = () => {
  //     const map = new window.google.maps.Map(document.getElementById('map'), {
  //         center: {lat: -34.397, lng: 150.644},
  //         zoom: 8
  //       });
  //     }

  render() {
    return (
      <div className="container">
        <h1>Neighborhood Map</h1>

        <section id="map">
        </section>
      </div>
    );
  }
}

export default scriptLoader(
  [`https://maps.googleapis.com/maps/api/js?key=AIzaSyDmJfjc7Uv-zPuOjtHx6GTiAFYz5JojX-A`]
) (App);
