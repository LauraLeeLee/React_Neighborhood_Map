import React, { Component } from 'react';
import PropTypes from 'prop-types';
import categories from '../data/categories.js';
import { getFSvenues } from '../data/fsData.js';

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
  };

  constructor(props) {
    super(props);

    this.state = {
      venues: [],
    }
    // this.handleToggle = this.handleToggle.bind(this);
    this.handleCategories = this.handleCategories.bind(this);
  }

  componentDidMount() {
    getFSvenues(this.props.centerMap)
    .then(realVenues => {
      this.setState({
        venues:realVenues
      });
      if(realVenues) {
        this.createMarkers(realVenues);
      }
    });
  }

  // create markers
  createMarkers() {
    const {myMap, centerMap, } = this.props;
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
    });
  }

  // handleToggle(e) {
  //   const {listOpen} = this.props;
  //   const togglingList = e.targer.value;
  //   this.props.onToggleList();
  //   console.log('list open:' );
  // }

  // handleCategories(e) {
  //
  //   this.props.filterCategories();
  // }

  render() {
    const { infoWindow, infowindowOpen, listOpen,  myMap, showFiltered } = this.props;
    const { venues } = this.state;

      console.log({venues});

    return(
      <div>
        <ul className="categories">
          {categories.map(category=> (
            <li key={category}
                onClick={this.handleCategories}
               >
              {category}
            </li>
          ))}
        </ul>
        <input id="filter-places"
              data-bind="textInput: filter"
              type="text"
              placeholder="Filter locations by name..."/>
        <ul className="placesList">
            <li>
              list item
            </li>
        </ul>
      </div>
    );
  }
}

export default PlacesList;
