import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlacesList extends Component {

  static propTypes = {
    locations: PropTypes.array.isRequired,
    listOpen: PropTypes.bool,
    infowindowOpen: PropTypes.bool,

  }

  render() {
    const { locations, infowindowOpen, listOpen } = this.props;
    return (
      <div>
        <ul className="placesList">
          {locations.map(location=> (
            <li key={location.title}>
              {location.title}
            </li>
          )
        )}
        </ul>
      </div>
    );
  }
}

export default PlacesList;
