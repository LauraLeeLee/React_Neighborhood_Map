import React, { Component } from 'react';
import { mapStyle } from '../data/mapStyle.js';
// import  locations  from '../data/locations.js';
// import { getFSvenues, realVenues} from '../data/fsData.js';
import scriptLoader from 'react-async-script-loader';
import PlacesList from './PlacesList.js';
// import InfoWindow from './InfoWindow.js';

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
      showFiltered: true,
    }
    this.toggleList = this.toggleList.bind(this);
    // this.filterByName = this.filterByName.bind(this);
    // this.filterCategories = this.filterCategories.bind(this);
  }

  toggleList = () => {
    const { listOpen, infoWindow, infowindowOpen } = this.state;
    if (!listOpen) {
        infoWindow.close();
      }
      // if(!infowindowOpen){
      //   this.setState({listOpen: false});
      // }
    this.setState({listOpen: !listOpen});
  }

   componentDidUpdate({ isScriptLoadSucceed }) {
    // const { isScriptLoaded, isScriptLoadSucceed } = this.props
    const { centerMap, mapError } = this.state;

    if (isScriptLoadSucceed && !this.state.mapIsReady) {
      let map = new window.google.maps.Map(document.getElementById('map'), {
          center: centerMap,
          zoom: 14,
          styles: mapStyle,
          gestureHandling: 'greedy',
          mapTypeControl: false
        });

        //create infowindows
        const infowindow = new window.google.maps.InfoWindow({maxWidth: 300});

        this.setState({
          myMap: map,
          mapIsReady: true,
          infoWindow: infowindow,
        });
    } else if (!this.state.mapIsReady) {
      this.setState({ mapError: true });
    }
  }


  render() {
        console.log(this.state);
    const { listOpen, infowindowOpen, infoWindow, myMap, showFiltered, centerMap, mapIsReady, mapError } = this.state;

    return (
      <div id="container" role="main">
        <h1 tabIndex="0">Florence Italy POI</h1>
        <h2 tabIndex="0">Results powered by Foursquare</h2>
        <h5
          className="toggle-list"
          tabIndex="0"
          onClick={this.toggleList}>
            {listOpen ? 'Hide List' : 'Show List'}
        </h5>
        <section id="listSection"
                  tabIndex={ listOpen ? "0" : "-1"}
                  className={ listOpen ? "list-show" : "list-hide"}>
          { mapIsReady ? (
          <PlacesList
            listOpen = {listOpen}
            infoWindow={infoWindow}
            infowindowOpen={infowindowOpen}
            myMap={myMap}
            centerMap={centerMap}
            showFiltered={showFiltered}
            toggleList={this.toggleList}
            filterByName={this.filterByName}
            filterCategories={this.filterCategories}/>
          ) : (
            <p>Technical difficulties, please try again</p>
          )}
        </section>

        <section id="map">
          {mapError ? (
            <div id="maperror">
              Google Maps not loading, please try your request again
            </div>
          ) : (
            <div className="mapload">
            Map is Loading
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default scriptLoader(
  [`https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDmJfjc7Uv-zPuOjtHx6GTiAFYz5JojX-A`]
) (App);
