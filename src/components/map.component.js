import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
require('dotenv').config();

const mapStyles = {
    width: '100%',
    height: '100%'
};

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

export class MapContainer extends Component {
  render() {
    console.log(API_KEY);
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: 37.77,
         lng: -122.43
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);