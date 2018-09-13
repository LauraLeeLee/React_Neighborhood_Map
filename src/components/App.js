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
      showFiltered: true,
    }
    this.toggleList = this.toggleList.bind(this);
  }

  toggleList = () => {
    const { listOpen } = this.state;
    this.setState({listOpen: !listOpen});
    console.log(listOpen);
  }

  filterList = () => {
    var filter = filter().toLowerCase();

    locations().forEach(function(location) {
      if(location.title.toLowerCase().indexOf(filter) !== -1) {
        location.showFiltered(true); //show filtered location(s)
        location.marker.setVisible(true); //show filtered location map marker
      } else {
        location.showFiltered(false); // hide non matching list item
        location.marker.setVisible(false); //hide map marker for non matching
      }
    });
  }

  // populateInfoWindow = (marker, infowindow, map) => {
  // 	//check to see if infowindow is already open
  // 	if (infowindow.marker != marker) {
  // 		//clear the infowindow content allowing streetview to load
  // 		infowindow.setContent('');
  // 		infowindow.marker = marker;
  // 		this.getPlacesDetails(marker, infowindow);
  // 		//see if the marker property is cleared if infowindow is closed
  // 		infowindow.addListener('closeclick', function() {
  // 			// vm.showMe(true);
  // 			// vm.showFS(true);
  // 			infowindow.marker = null;
  // 			// marker.setIcon(defaultIcon);
  // 			// vm.fourSqFinds([]);
  // 		});
  // 		//open the infowindow on the proper marker
  // 		infowindow.open(map, marker);
  // 		marker.setAnimation(window.google.maps.Animation.BOUNCE);
  // 		setTimeout(function() {
  // 			marker.setAnimation(null);
  // 		}, 5000);
  // 	}
  // }
  //
  // //gets place details from place_id via PlacesService
  //  getPlacesDetails = (marker, infowindow, map) => {
  // 	let service = new window.google.maps.places.PlacesService(map);
  // 	service.getDetails({
  // 		placeId: marker.id
  // 	}, function(place, status) {
  // 		if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  // 			// Set the marker property on this infowindow so it isn't created again.
  // 			infowindow.marker = marker;
  // 			var innerHTML = '<div id = "places-details">';
  // 			innerHTML += ' <div id = "place-name">';
  // 			if (place.name) {
  // 				innerHTML += '<strong>' + place.name + '</strong>';
  // 			}
  // 			innerHTML += '</div>';
  // 			if (place.formatted_address) {
  // 				innerHTML += '<br>' + place.formatted_address;
  // 			}
  // 			if (place.formatted_phone_number) {
  // 				innerHTML += '<br>' + place.formatted_phone_number;
  // 			}
  // 			if (place.opening_hours) {
  // 				innerHTML += '<br><br><strong>Hours:</strong><br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1] + '<br>' + place.opening_hours.weekday_text[2] + '<br>' + place.opening_hours.weekday_text[3] + '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6];
  // 			}
  // 			if (place.website) {
  // 				innerHTML += '<br><br><a id = "website" href=' + place.website + '>' + place.website + '</a>';
  // 			}
  // 			if (place.photos) {
  // 				innerHTML += '<br><br><img src="' + place.photos[0].getUrl({
  // 					maxHeight: 100,
  // 					maxWidth: 200
  // 				}) + '">';
  // 			}
  // 			//creates #pano element for streetViewService to use
  // 			innerHTML += ' <div id = "pano"></div>';
  // 			innerHTML += '<div class="iw-bottom-gradient"></div>';
  // 			innerHTML += '</div>';
  // 			infowindow.setContent(innerHTML);
  // 			infowindow.open(map, marker);
  // 			// Make sure the marker property is cleared if the infowindow is closed.
  // 			infowindow.addListener('closeclick', function() {
  // 				infowindow.marker = null;
  // 			});
  // 		}
  // 	});
  // }



  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    // const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        let map = new window.google.maps.Map(document.getElementById('map'), {
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

                this.populateInfoWindow(this.marker, this.infowindow,this.map);

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
  [`https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDmJfjc7Uv-zPuOjtHx6GTiAFYz5JojX-A`]
) (App);
