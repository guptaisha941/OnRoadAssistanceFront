import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class DemoPg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      locations:[],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if(this._isMounted) {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      },
      () => {
        console.log('Error getting current position');
      }
    );}

  componentWillUnmount() {
    this._isMounted = false;
  }
  

  render() {
    const { google } = this.props;
    const { lat, lng, locations } = this.state;

    if (!lat || !lng) {
      return <div>Loading...</div>;
    }

    const mapStyles = {
      width: '100%',
      height: '500px',
    };

    const mapOptions = {
      center: { lat, lng },
      zoom: 16,
    };

    return (
      <Map
        google={this.props.google}
        zoom={mapOptions.zoom}
        style={mapStyles}
        initialCenter={mapOptions.center}
      >
        <Marker
          name={'My Location'}
          position={{ lat, lng }}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/blue.png',
            anchor: new google.maps.Point(16, 16),
            scaledSize: new google.maps.Size(32, 32),
          }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC_9cAGZnlvSGLKRUMCxIgteTpaMvE83oY',
})(DemoPg);
