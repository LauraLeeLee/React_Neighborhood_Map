import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlacesList extends Component {

  static propTypes = {
    locations: PropTypes.array.isRequired,
    listOpen: PropTypes.bool.isRequired,
    infowindow: PropTypes.object.isRequired,
    infowindowOpen: PropTypes.bool.isRequired,
    map: PropTypes.object.isRequired,
    onToggleList: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e) {
    const {listOpen} = this.props;
    const togglingList = e.targer.value;
    this.props.onToggleList();
    console.log('list open:' );
  }

  render() {
    const { locations, infowindowOpen, listOpen, onToggleList, handleToggle, map } = this.props;
    console.log({onToggleList});
    console.log({handleToggle});
    console.log({locations});
    console.log({listOpen});
    console.log({map});
    console.log({infowindowOpen});
    return (
      <div>
        <h5
          className="toggle-list"
          onClick={handleToggle}>
            {listOpen ? 'Hide List' : 'Show List'}
        </h5>
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
