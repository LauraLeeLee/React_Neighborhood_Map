import React, { Component } from 'react';
import PlacesList from './PlacesList.js';
import PropTypes from 'prop-types';

class InfoWindow extends Component {
  static propTypes = {
    // venues: PropTypes.array.isRequired,
    listOpen: PropTypes.bool.isRequired,
    infowindowOpen: PropTypes.bool.isRequired,
    infoWindow: PropTypes.object.isRequired
  }
  render() {
    const {listOpen, infoWindow, infowindowOpen, venues } = this.props;
    // console.log({listOpen});
    // console.log({infowindowOpen});

    return(
      <div>infowindow</div>
    );
  }
}

export default InfoWindow;
