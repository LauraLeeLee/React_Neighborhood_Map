import React, { Component } from 'react';
import  locations  from '../data/locations.js';
import PlacesList from './PlacesList.js';
import PropTypes from 'prop-types';

class InfoWindow extends Component {
  static propTypes = {
    listOpen: PropTypes.bool.isRequired,
    infowindowOpen: PropTypes.bool.isRequired,
    infowindow: PropTypes.object.isRequired
  }
  render() {
    const {listOpen, infowindowOpen } = this.props;
    console.log({listOpen});
    console.log({infowindowOpen});

    return(
      <div>infowindow</div>
    );
  }
}

export default InfoWindow;
