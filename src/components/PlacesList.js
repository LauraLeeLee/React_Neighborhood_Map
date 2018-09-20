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
    const {myMap, infoWindow } = this.props;
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
      const matches = venue.name.toLowerCase().indexOf(query) > -1;
      venue.marker.setVisible(matches);
      console.log(matches);
      return matches;
    });

    this.setState(
      { filteredList: filteredMarkers }
    );
  };

  openInfowindow = (venue, marker) => {
    window.google.maps.event.trigger(venue.marker, "click");
    console.log("openInfowindow triggered");
    console.log(venue.marker);
    console.log(venue.name);
  }


  render() {
    const { filteredList } = this.state;
    console.log(filteredList);

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
                {filteredList.map(venue => (
                  <li key={venue.id}
                      onClick={this.openInfowindow}>
                    {venue.name}
                    </li>
                ))}
          </ul>

      </div>
    );
  }
}

export default PlacesList;
