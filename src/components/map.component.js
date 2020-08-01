import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import isEmpty from 'lodash.isempty';
import SearchBox from './searchbox';
import Marker from './marker'
import SAN_FRANCISCO_CENTER from '../const/sf_center';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
    };
  }

  static defaultProps = {
    zoom: 13
  };

  handleApiLoaded = (map, maps) => {
    // use map and maps objects
    if (map && maps) {
      this.setState({
        mapApiLoaded: true,
        mapInstance: map,
        mapApi: maps
      });
    }
  };

  addPlace = (place) => {
    this.setState({ places: place });
  };

  render({places, mapApiLoaded, mapInstance, mapApi } = this.state) {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '90vh' }}>
        {mapApiLoaded && (<SearchBox
          map={mapInstance}
          mapApi={mapApi}
          addplace={this.addPlace}
          />)}
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`, libraries: ['places', 'geometry']}}
        defaultCenter={SAN_FRANCISCO_CENTER}
        defaultZoom={this.props.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
      >
      {!isEmpty(places)
        && places.map((place) => (
          <Marker
            key={place.id}
            text={place.name}
            lat={place.geometry.location.lat()}
            lng={place.geometry.location.lng()}
          />
            ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;