import React, { Component } from 'react';
import { mapStyle } from '../data/mapStyle.js';
// import  locations  from '../data/locations.js';
import { getFSvenues, realVenues} from '../data/fsData.js';
import scriptLoader from 'react-async-script-loader';
import PlacesList from './PlacesList.js';
import InfoWindow from './InfoWindow.js';
import {populateInfoWindow, getPlacesDetails} from '../data/placesDetails.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: true,
      infoWindow: {},
      infowindowOpen: false,
      myMap: {},
      centerMap: {
        lat: 43.7696,
        lng: 11.2558
      },
      mapIsReady: false,
      mapError: false,
      venues: [],
      showFiltered: true,
    }
    this.toggleList = this.toggleList.bind(this);
    // this.filterByName = this.filterByName.bind(this);
    // this.filterCategories = this.filterCategories.bind(this);
    this.logOutStates = this.logOutStates.bind(this);
  }

  logOutStates = () => {
    console.log(this.state);
  }

  toggleList = () => {
    const { listOpen } = this.state;
    this.setState({listOpen: !listOpen});
  }

  // componentDidMount() {
  //   if(this.state.map == map) {
  //     getFSvenues(this.state.centerMap)
  //       .then(realVenues => {
  //         this.setState({
  //           venues:realVenues
  //         });
  //       });
  //       console.log(this.state.venues);
  //     } else {
  //       console.log("no map created");
  //     }
  //   }

   componentDidUpdate({ isScriptLoadSucceed }) {
    // const { isScriptLoaded, isScriptLoadSucceed } = this.props
    const { marker, infoWindow, myMap, centerMap, mapIsReady, mapError, venues } = this.state;

    if (isScriptLoadSucceed && !this.state.mapIsReady) {
      let map = new window.google.maps.Map(document.getElementById('map'), {
          center: centerMap,
          zoom: 13,
          styles: mapStyle,
          gestureHandling: 'greedy',
          mapTypeControl: false
        });

        //create infowindows
        const infowindow = new window.google.maps.InfoWindow({maxWidth: 200});

        this.setState({
          myMap: map,
          mapIsReady: true,
          infoWindow: infowindow,
        });

        // create markers
        // venues.map(venue => µ{
        //   // let position ={venue.location.lat, venue.location.lng};
        //   let marker = new window.google.maps.Marker({
      	// 		map: map,
      	// 		position: venue.location,
      	// 		title: venue.name,
      	// 		animation: window.google.maps.Animation.DROP,
      	// 		// icon: defaultIcon,
      	// 		id: venue.id,
      	// 		open: false
      	// 	});

          //adds click to markers with bounce
          // marker.addListener('click', function() {
          //   const marker = this;
          //     marker.setAnimation(window.google.maps.Animation.BOUNCE);
          //     setTimeout(function() {
          //       marker.setAnimation(null);
          //     }, 2500);
          //
          //   populateInfoWindow(marker, infowindow, map);
          //
          //   //get locations information
          //
          //   //create infowindow
          //   // marker.infowindow = `div class="infowindow">
          //   //                       <div class="item-info">
          //   //                         <h3 class="item-name">
          //   //                       </div>
          //   //                     </div>`
          //
          //   });
          // });
      // }
    } else if (!this.state.mapIsReady) {
      this.setState({ mapError: true });
    }
  }


  render() {
    const { locations, listOpen, infowindowOpen, infowindow, myMap, showFiltered } = this.state;
    // console.log(listOpen);
    // console.log(infowindowOpen);
    // console.log(map);
    // console.log(this.toggleList);
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
                      map={myMap}
                      showFiltered={showFiltered}
                      filterByName={this.filterByName}
                      filterCategories={this.filterCategories}/>
        </section>

        <section id="map">
          <InfoWindow
          locations = {locations}
          listOpen = {listOpen}
          infowindow={infowindow}
          infowindowOpen={infowindowOpen}/>
        </section>
      </div>
    );
  }
}

export default scriptLoader(
  [`https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDmJfjc7Uv-zPuOjtHx6GTiAFYz5JojX-A`]
) (App);
