import React, { Component } from 'react';
import  locations  from '../data/locations.js';
import PlacesList from './PlacesList.js';
import PropTypes from 'prop-types';

class InfoWindow extends Component {
  static propTypes = {
    listOpen: PropTypes.bool,
    infowindowOpen: PropTypes.bool,
  }
  render() {
    const {listOpen, infowindowOpen } = this.props;
    console.log(infowindowOpen);

    return(
      <div>InfoWindow</div>
    );
  }
}

export default InfoWindow;
