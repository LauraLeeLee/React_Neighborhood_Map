import React, { Component } from 'react';
import { mapStyle } from '../data/mapStyle.js';
import  locations  from '../data/locations.js';
import scriptLoader from 'react-async-script-loader';
import PlacesList from './PlacesList.js';
import InfoWindow from './InfoWindow.js';
import {populateInfoWindow, getPlacesDetails} from '../data/placesDetails.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: true,
      infowindow: {},
      infowindowOpen: false,
      map: {},
      locations: locations, //data from locations.js file
    }
    this.toggleList = this.toggleList.bind(this);
  }

  toggleList = () => {
    const { listOpen } = this.state;
    this.setState({listOpen: !listOpen});
    console.log(listOpen);
  }


  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    // const { isScriptLoaded, isScriptLoadSucceed } = this.props;
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

          //create infowindows
          const infowindow = new window.google.maps.InfoWindow({maxWidth: 200});

          //create markers
          this.state.locations.map(location => {
            let marker = new window.google.maps.Marker({
        			map: map,
        			position: location.location,
        			title: location.title,
        			animation: window.google.maps.Animation.DROP,
        			// icon: defaultIcon,
        			id: location.id,
        			open: false
        		});

            //adds click to markers with bounce
            marker.addListener('click', function() {
              const marker = this;
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
                setTimeout(function() {
                  marker.setAnimation(null);
                }, 2500);

                getPlacesDetails();

              //get locations information

              //create infowindow
              marker.infowindow = `div class="infowindow">
                                    <div class="item-info">
                                      <h3 class="item-name">
                                    </div>
                                  </div>`

              });
            });

          this.setState({
            map: map,
            infowindow: infowindow,
          });

        console.log(map);
        console.log(locations);
        }
      }
      // else this.props.onError()
    }



  render() {
    const { locations, listOpen, infowindowOpen, infowindow, map } = this.state;
    console.log(listOpen);
    console.log(infowindowOpen);
    console.log(map);
    console.log(this.toggleList);
    return (
      <div className="container">
        <h1>Neighborhood Map</h1>
        <h5
          className="toggle-list"
          onClick={this.toggleList}>
            {listOpen ? 'Hide List' : 'Show List'}
        </h5>
        <section id="listSection"
                 className={ listOpen ? "list-show" : "list-hide"} >
          <PlacesList locations = {locations}
                      listOpen = {listOpen}
                      infowindow={infowindow}
                      infowindowOpen={infowindowOpen}
                      map={map} />
        </section>

        <section id="map">
          <InfoWindow
          listOpen = {listOpen}
          infowindow={infowindow}
          infowindowOpen={infowindowOpen}/>
        </section>
      </div>
    );
  }
}

export default scriptLoader(
  [`https://maps.googleapis.com/maps/api/js?key=AIzaSyDmJfjc7Uv-zPuOjtHx6GTiAFYz5JojX-A`]
) (App);
