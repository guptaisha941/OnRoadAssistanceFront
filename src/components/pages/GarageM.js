import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import './map.css';

class MapWithLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      locations:[],
      hospitals: [],
      garages: [],
      query: '',
      filteredLocations: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
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
          const { lat, lng } = position.coords;}},

      () => {console.log('Error getting current position');});
  
    axios.get('http://localhost:5000/api/locations/garages')
      .then(response => {
        if (this._isMounted){
          this.setState({
            locations: response.data,
            filteredLocations: response.data,});}})
      .catch(error => {
        console.log(error);});
  }
  
  componentWillUnmount() {
    this._isMounted = false;}

  handleSearch(event) {
    const query = event.target.value;
    const { locations } = this.state;
    const filteredLocations = locations.filter((location) =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({
      query: query,
      filteredLocations: filteredLocations,
    });
  }

  render() {
    const { google } = this.props;
    const { lat, lng, filteredLocations, hospitals, garages, query, locations } = this.state;
  
    if (!lat || !lng) {
      return <div>Loading...</div>;
    }
  
    const mapStyles = {
      width: '65%',
      height: '90%',
      position: 'fixed',
      right: 0,
      top: 0,
      // margin: '0 20px 0 0', // added margin
      border: '1px solid #ccc', // add border
      borderRadius: '5px', // add border radius
    };
  
    const mapOptions = {
      center: { lat, lng },
      zoom: 16,
    };
  
    const searchStyles = {
      width: '50%',
      height: '100%',
      padding: '10px',
      boxSizing: 'border-box',
      margin: '0 0 0 20px', // added margin
    };
  
    const nearbyPlacesStyles = {
      width: '50%',
      height: '100%',
      padding: '10px',
      boxSizing: 'border-box',
      overflow: 'auto',
    };
  
    const containerStyles = {
      display: 'flex',
      height: '100vh',
    };

    const handleLocationClick = (location) => {
      window.location.href = '/order';
    }

    const filteredNames = filteredLocations.map(location => location.name);
    const allNames = locations.map(location => location.name);
    const namesToDisplay = query ? filteredNames : allNames;

    const locationToDisplay = query ? filteredLocations : locations;

    return (
      <div style={containerStyles}>
        <div style={searchStyles}>
          <input
            type="text"
            placeholder="Search for a location"
            value={this.state.query}
            onChange={this.handleSearch}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <h2>Nearby Places</h2>
          <div>
            {locationToDisplay.map((location, index) => (
              <div className="nameBar" key={`name-${index}`}
              // onClick={() => {
              //   const location = locations.find((loc) => loc.name === name);
              //   handleLocationClick(location);
              // }}
              >
                <a href={`/order/${location.id}`}>{location.name}</a> 
                {/* {name} */}
              </div>
            ))}
          </div>
        </div>
  
        <div style={{ width: '50%', height: '100vh', margin: '10px' }}>
          <Map
            google={google}
            zoom={14}
            style={mapStyles}
            initialCenter={mapOptions.center}
            center={{ lat, lng }}
          >
              <Marker
              position={{ lat, lng }}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/red.png',
              }}
            />
            {filteredLocations.map((location, index) => (
              <Marker
                key={`location-${index}`}
                position={{ lat: location.lat, lng: location.lng }}
                title={location.name}
                icon={
                  location.type === 'hospital' ? 'https://maps.google.com/mapfiles/ms/icons/hospitals.png' :
                  location.type === 'garage' ? 'https://maps.google.com/mapfiles/ms/icons/blue.png' :
                  location.type === 'petrol pump' ? 'https://maps.google.com/mapfiles/ms/icons/gas.png' :
                  null
                }
                onClick={() => {
                  window.location.href = `/order/${location.id}`;
                }}
                />))}
          </Map>
        </div>
  
        <div style={nearbyPlacesStyles}>
          
        </div>
      </div>);
  }
}  

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC_9cAGZnlvSGLKRUMCxIgteTpaMvE83oY',
})(MapWithLocation);
