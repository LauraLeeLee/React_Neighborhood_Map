import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFSvenues, getFSdetails, categoryName } from '../data/fsData.js';
import {gatherContent, createInfowindow} from '../data/placesDetails.js';

class PlacesList extends Component {

  static propTypes = {
    listOpen: PropTypes.bool.isRequired,
    infoWindow: PropTypes.object.isRequired,
    // infowindowOpen: PropTypes.bool.isRequired,
    myMap: PropTypes.object.isRequired,
    centerMap: PropTypes.object.isRequired,
    // filterByName: PropTypes.func.isRequired,
    // filterCategories: PropTypes.func.isRequired,
    showFiltered: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      filteredList: [],
      query: ""
    };
    // this.handleToggle = this.handleToggle.bind(this);
    // this.handleCategories = this.handleCategories.bind(this);
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
    });
  }

  // create markers
  createMarkers(realVenues) {
    const {myMap, centerMap, infoWindow } = this.props;
    const {venues} = this.state;
    venues.map(venue => {
      // let position ={venue.location.lat, venue.location.lng};
      let marker = new window.google.maps.Marker({
    		map: myMap,
    		position: venue.location,
    		title: venue.name,
    		animation: window.google.maps.Animation.DROP,
    		// icon: defaultIcon,
    		id: venue.id,
    		open: false
    	});

      //adds click to markers
      marker.addListener('click', function() {
        const marker = this;
          //adds bounce to marker when clicked
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function() {
            marker.setAnimation(null);
          }, 2500);
        getFSdetails(marker.id)
          .then(data => {
            gatherContent(marker, data);
            createInfowindow(marker);
          })
          .then(() => {
            infoWindow.setContent(marker.content);
            infoWindow.open(myMap, marker);
          })
          .catch(() => {
            console.log("error creating infowindow");
          });
      });
    });

  }

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
      console.log(venue);
      const matches = venue.name.toLowerCase().indexOf(query) > -1;
      venue.marker.setVisibile(matches);
      return matches;
    });

    this.setState(
      { filteredList: filteredMarkers }
    );
  };


  render() {
    const {listOpen, showFiltered } = this.props;
    const { venues } = this.state;

    return(
      <div>
        <ul className="categories">
          {categoryName.map(name => (
            <li key={name}
                onClick={this.handleCategories}
               >
              {name}
            </li>
          ))}
        </ul>
        <input id="filter-places"
              data-bind="textInput: filter"
              type="text"
              placeholder="Filter locations by name..."
              onChange={this.filterByName}/>

          <ul className="placesList">
                {venues.map(venue => (
                  <li key={venue.id}>
                    {venue.name}
                    </li>
                ))}
          </ul>

      </div>
    );
  }
}

export default PlacesList;
