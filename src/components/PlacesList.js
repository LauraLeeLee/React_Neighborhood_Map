import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFSvenues, getFSdetails } from '../data/fsData.js';
import {gatherContent, createInfowindow, createInfowindowError} from '../data/placesDetails.js';
import categories from '../data/categories.js'

class PlacesList extends Component {

  static propTypes = {
    listOpen: PropTypes.bool.isRequired,
    infoWindow: PropTypes.object.isRequired,
    myMap: PropTypes.object.isRequired,
    centerMap: PropTypes.object.isRequired,
    toggleList: PropTypes.func.isRequired,
    showFiltered: PropTypes.bool.isRequired,
    checkListOpen: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      filteredList: [],
      query: "",
      categories: [],
      fsApiReturned: true
    };
  }

  componentDidMount() {
    getFSvenues(this.props.centerMap)
    .then(realVenues => {
      this.setState({
        venues:realVenues,
        filteredList: realVenues
      });
      if(realVenues) {
        this.createMarkers(realVenues);
      }
    }).catch(error => this.setState({fsApiReturned: false}));
  }

  // create markers
  createMarkers(realVenues) {
    const {myMap, infoWindow, checkListOpen } = this.props;
    const {venues} = this.state;
    venues.map((venue, marker) => {
      // let position ={venue.location.lat, venue.location.lng};
      venue.marker = new window.google.maps.Marker({
    		map: myMap,
    		position: venue.location,
    		title: venue.name,
    		animation: window.google.maps.Animation.DROP,
    		// icon: defaultIcon,
    		id: venue.id,
    		open: false
    	});

      //adds click to markers
      venue.marker.addListener('click', function() {
        const marker = this;
          //adds bounce to marker when clicked
          venue.marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function() {
            marker.setAnimation(null);
          }, 2500);

        //gets fs details for marker venue on marker click
        getFSdetails(marker.id)
          .then(data => {

            gatherContent(marker, data);
            createInfowindow(marker);
          })
          .then(() => {
            infoWindow.setContent(marker.content);
            infoWindow.open(myMap, marker);
          })
          .catch(() => {createInfowindowError(marker)
              console.log("Error with FS details");
              infoWindow.setContent(marker.content);
              infoWindow.open(myMap, marker);
          });
          checkListOpen();
      });
    });
  }

  //filters list from input entry
  filterByName = (event) => {
    const {venues} = this.state;
    const {infoWindow} = this.props;

    //close any open infowindows
    infoWindow.close();

    //gather query entered into input
    const query = event.target.value.toLowerCase();

    //update query state with input
    this.setState({query: query});

    //filter markers
    const filteredMarkers = venues.filter(venue => {
      const matches = venue.name.toLowerCase().indexOf(query) > -1;
      venue.marker.setVisible(matches);
      return matches;
    });
    this.setState(
      { filteredList: filteredMarkers }
    );
  };

  //filter list by category selected
  filterByCategory = (filterObj) => {
    const {venues, categories } = this.state;
    const {infoWindow} = this.props;

    //close any open infowindows
    infoWindow.close();

    //filter markers as per category
    const filteredCategories = venues.filter(venue => {
      const venueCat = venue.categories;
      let catName = venueCat.map(cat => cat.name)[0];

    // keeping code for catName to see syntax
      // catName = catName === 'History Museum' ? 'Museum' :catName ;
      // a = condition1 ? 1 : condition2 ? 2 : condition3 ? 3 : null;
      // catName = catName == 'Outdoor Sculpture' ||
      //           catName == 'Monument / Landmark' ||
      //           catName == 'Historic Site' ||
      //           catName == 'City Hall' ||
      //           catName == 'Bridge' ||
      //           catName == 'Scenic Lookout' ||
      //           catName == 'Garden'
      //           ? 'Other POI'
      //           : catName;
      const otherCats = [ 'Outdoor Sculpture', 'Monument / Landmark', 'Historic Site', 'City Hall', 'Bridge', 'Scenic Lookout', 'Garden'];
      catName = otherCats.includes(catName) ? 'Other POI' :  catName;

      const matches = catName.toLowerCase().includes(filterObj.toLowerCase());
      venue.marker.setVisible(matches);
      return matches;
    });
    this.setState(
      { filteredList: filteredCategories }
    );
  };

  //open infowindow when a venue in list is clicked
  openInfowindow = (venue) => {
    window.google.maps.event.trigger(venue.marker, "click");
  }

  render() {
  const { filteredList, fsApiReturned } = this.state;
  const { listOpen } = this.props;

  if(!fsApiReturned) {
    return (<div>Foursquare not responding, please try again</div>)
    } else {
      return(
        <div>
          <ul className="categories" role="tablist">
          {categories.map(name => (
            <li key={name}
            role="tab"
            tabIndex={listOpen ? "0" : "-1"}
            onClick={() => this.filterByCategory(name)}
            onKeyPress={() => this.filterByCategory(name)}>
            {name}
            </li>
          ))}
          </ul>
          <input id="filter-places"
          type="text"
          role="search"
          tabIndex={listOpen ? "0" : "-1"}
          data-bind="textInput: filter"
          placeholder="Filter locations by name..."
          onChange={this.filterByName}/>

          {filteredList.length < 1 ? (
          <div className="filterError">Sorry, no venues match your search, please try again</div>
          ) : (
          <div>
            <ul className="placesList" role="listbox">
            {filteredList.map(venue => (
              <li key={venue.id}
              role="button"
              tabIndex={listOpen ? "0" : "-1"}
              onClick={() => this.openInfowindow(venue)}
              onKeyPress={() => this.openInfowindow(venue)}>
              {venue.name}
              </li>
            ))}
            </ul>
            <div className="fade-text"></div>
          </div>
        )}
        </div>
      );
    }
  }
}

export default PlacesList;
