import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import axios from 'axios';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 37.77,
      lng: -122.43
    },
    zoom: 13
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={37.7749}
            lng={-122.43}
            text="You are here"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;