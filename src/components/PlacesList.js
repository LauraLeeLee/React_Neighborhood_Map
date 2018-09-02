import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlacesList extends Component {

  static propTypes = {
    locations: PropTypes.array.isRequired
  }

  render() {
    const { locations } = this.props;
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
