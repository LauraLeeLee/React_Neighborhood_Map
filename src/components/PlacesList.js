import React, { Component } from 'react';
import PropTypes from 'prop-types';
import categories from '../data/categories.js';

class PlacesList extends Component {

  static propTypes = {
    // locations: PropTypes.array.isRequired,
    listOpen: PropTypes.bool.isRequired,
    infowindow: PropTypes.object.isRequired,
    infowindowOpen: PropTypes.bool.isRequired,
    map: PropTypes.object.isRequired,
    // filterByName: PropTypes.func.isRequired,
    // filterCategories: PropTypes.func.isRequired,
    showFiltered: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    // this.handleToggle = this.handleToggle.bind(this);
    this.handleCategories = this.handleCategories.bind(this);
  }

  // handleToggle(e) {
  //   const {listOpen} = this.props;
  //   const togglingList = e.targer.value;
  //   this.props.onToggleList();
  //   console.log('list open:' );
  // }

  handleCategories(e) {

    this.props.filterCategories();
  }

  render() {
    const { locations, infowindowOpen, listOpen,  map, showFiltered } = this.props;
    // console.log({locations});
    console.log({listOpen});
    console.log({map});
    console.log({infowindowOpen});
    console.log({showFiltered});
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
