import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFSvenues, getFSdetails, categoryName, poiNames } from '../data/fsData.js';
import {gatherContent, createInfowindow} from '../data/placesDetails.js';
import categories from '../data/categories.js'

class PlacesList extends Component {

  static propTypes = {
    listOpen: PropTypes.bool.isRequired,
    infoWindow: PropTypes.object.isRequired,
    // infowindowOpen: PropTypes.bool.isRequired,
    myMap: PropTypes.object.isRequired,
    centerMap: PropTypes.object.isRequired,
    toggleList: PropTypes.func.isRequired,
    showFiltered: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      filteredList: [],
      query: "",
      categories: []
    };
    // this.handleToggle = this.handleToggle.bind(this);
    // this.handleCategories = this.handleCategories.bind(this);
    // this.openInfowindow =this.openInfowindow .bind(this);
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
    // getAllCats(getFSvenues);
  }

  // create markers
  createMarkers(realVenues) {
    const {myMap, infoWindow, listOpen, toggleList, infowindowOpen } = this.props;
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
          if (listOpen) {
             toggleList();
           }
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
    console.log(filteredMarkers);
    this.setState(
      { filteredList: filteredMarkers }
    );
  };

  //filter list by category selected
  filterByCategory = (filterObj) => {
    const {venues, categories, } = this.state;
    const {infoWindow} = this.props;

    //close any open infowindows
    infoWindow.close();

    //filter markers as per category
    const filteredCategories = venues.filter(venue => {
      const venueCat = venue.categories;
      console.log(venue.categories);

      let catName = venueCat.map(cat => cat.name)[0];

      // catName =  catName == 'Outdoor Sculpture' ? 'Other POI' : 'Monument/Landmark' ? 'Other POI' : 'Historic Site' ? 'Other POI' : 'City Hall' ? 'Other POI' : 'Bridge' ? 'Other POI' : 'Scenic Lookout' ? 'Other POI' : 'Garden' ? 'Other POI' : catName;
      // catName = catName === 'History Museum' ? 'Museum' :catName ;
      // a = condition1 ? 1 : condition2 ? 2 : condition3 ? 3 : null;
      // catName = catName == 'History Museum' ? 'Museum' : 'Church' ? 'Church' : 'Plaza' ? 'Plaza' : 'Outdoor Sculputre' ? 'Other POI' : 'Monument/Landmark' ? 'Other POI' : 'Historic Site' ? 'Other POI' : 'City Hall' ? 'Other POI' : 'Bridge' ? 'Other POI' : 'Scenic Lookout' ? 'Other POI' : 'Garden' ? 'Other POI' : catName;
      console.log(catName);
      const matches = catName.toLowerCase().includes(filterObj.toLowerCase());
      venue.marker.setVisible(matches);
      return matches;
    });
    console.log(filterObj);
    console.log(filteredCategories);
    this.setState(
      { filteredList: filteredCategories }
    );
  };

  // const allCategories =  venues.map(venue => {
  //   const venueCat = venue.categories;
  //   console.log(venue.categories);
  //
  //   let allCatNames = venueCat.map(cat => cat.name)[0];
  //   console.log(allCatNames);
  // });

   getCatNames = () => {
    const {venues, categories, } = this.state;
    const venueCatArray = venues.map( venue => venue.categories);
    console.log(venueCatArray);
    const catNameArray = venueCatArray.map(item => item.value);
  console.log(catNameArray);
}

  //open infowindow when a venue in list is clicked
  openInfowindow = (venue) => {
    const {toggleList, listOpen} = this.props;
    window.google.maps.event.trigger(venue.marker, "click");
    console.log("openInfowindow triggered");
  }

  render() {
    const { filteredList } = this.state;
    const { listOpen } = this.props;
    console.log(filteredList);
    this.getCatNames();

    return(
      <div>
        <ul className="categories">
          {categories.map(name => (
            <li key={name}
                role="button"
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

          <ul className="placesList" role="listbox">
                {filteredList.map(venue => (
                  <li key={venue.id}
                      role="option"
                      tabIndex={listOpen ? "0" : "-1"}
                      onClick={() => this.openInfowindow(venue)}
                      onKeyPress={() => this.openInfowindow(venue)}>
                    {venue.name}
                    </li>
                ))}
          </ul>
          <div  className="fade-text"></div>
      </div>
    );
  }
}

export default PlacesList;
