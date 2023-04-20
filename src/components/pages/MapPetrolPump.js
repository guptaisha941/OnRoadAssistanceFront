import React, { Component, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import './map.css';
import Modal from 'react-modal';
import Button from '../component/Button';
// import { Button, Form } from 'react-bootstrap';
import styled from "styled-components";
import Input from "../component/Input";
import Output from '../component/Output';

class MapWithLocation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      id: 0,
      locations: [],
      hospitals: [],
      garages: [],
      showModal: false,
      query: '',
      filteredLocations: [],
      
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  state = {
    isModalOpen: false,
  };

  handleRequestClick = () => {
    this.setState({ isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here
    this.setState({ isModalOpen: false });
  };


  calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180; // deg2rad below
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        (1 - Math.cos(dLon))) /
      2;

    const distance = R * 2 * Math.asin(Math.sqrt(a)); // Distance in km
    return distance.toFixed(1); // Round to 1 decimal place
  };

  componentDidMount() {
    this._isMounted = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (this._isMounted) {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          const { lat, lng } = position.coords;
        }
      },

      () => { console.log('Error getting current position'); });



    axios.get('http://localhost:5000/api/locations/petrolpump')
      .then(response => {
        if (this._isMounted) {
          const locations = response.data.map((location) => {
            const distance = this.calculateDistance(
              this.state.lat,
              this.state.lng,
              location.lat,
              location.lng
            );
            return { ...location, distance };
          });
          this.setState({
            locations,
            filteredLocations: locations,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

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

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f8f9fa',
        border: 'none',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        padding: '30px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}; 

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

    Modal.setAppElement('#root');


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
          <div>
            {locationToDisplay.map((location, index) => (
              <div className="location-box" key={`name-${index}`}>
                <a href={`/order/${location._id}`} className="location-name">{location.name} </a>
                <span className="location-distance">{location.distance} km</span>
              </div>
            ))}
          </div>

          <div className="container">
        <button className="btn" onClick={this.handleRequestClick}>
          Request Hospital
        </button>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleCloseModal}
          style={customStyles}
          contentLabel="Request Hospital"
        >
          <button className="modal__close" onClick={this.handleCloseModal}>
            &times;
          </button>
          <h2 className="modal-title">Request Garage Support</h2>
          
          <form onSubmit={this.handleFormSubmit}>
            <InputContainer>
            <WelcomeText> </WelcomeText>
            <Output
              type="text"
              placeholder="Service Type"
              className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              style={{ color: 'black' }}


              // value={phone}
              // onChange={(e) => setPhone(e.target.value)}
            />
            <WelcomeText> </WelcomeText>
            <Output
              type="text"
              placeholder="Location"
              className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              style={{ color: 'black' }}


              // value={phone}
              // onChange={(e) => setPhone(e.target.value)}
            />
            <WelcomeText> </WelcomeText>
            <Output
              type="text"
              placeholder="Vehicle Number"
              className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              style={{ color: 'black' }}


              // value={phone}
              // onChange={(e) => setPhone(e.target.value)}
            />
            <WelcomeText> </WelcomeText>
            <Output
              type="text"
              placeholder="Vehicle Make"
              className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              style={{ color: 'black' }}


              // value={phone}
              // onChange={(e) => setPhone(e.target.value)}
            />
            <WelcomeText> </WelcomeText>
            <Output
              type="text"
              placeholder="Vehicle Model"
              className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              style={{ color: 'black' }}


              // value={phone}
              // onChange={(e) => setPhone(e.target.value)}
            />

            <WelcomeText> </WelcomeText>
            <Output
              type="text"
              placeholder="Additional Details"
              className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              style={{ color: 'black' }}
              value={
                filteredLocations.length > 0
                  ? `${filteredLocations[0].lat}, ${filteredLocations[0].lng}`
                  : ''
              }
              onChange={(e) =>
                this.setState({
                  filteredLocations: [
                    {
                      lat: parseFloat(e.target.value.split(',')[0].trim()),
                      lng: parseFloat(e.target.value.split(',')[1].trim()),
                    },
                  ],
                })
              }

              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            </InputContainer>
            <WelcomeText> </WelcomeText>
            <ButtonContainer>
            <Button content="Sign Up" type="submit" />
          </ButtonContainer>

          </form>
        </Modal>
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
                url: 'https://maps.google.com/mapfiles/ms/icons/blue.png',
              }}
            />
            {filteredLocations.map((location, index) => (
              <Marker
                key={`location-${index}`}
                position={{ lat: location.lat, lng: location.lng }}
                title={location.name}
                icon={
                  location.type === 'petrol pump' ? 'https://maps.google.com/mapfiles/ms/icons/gas.png' :
                    null
                } />))}
          </Map>
        </div>
      </div>);
  }

  
}


const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 6;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WelcomeText = styled.h2`
  margin: 0.5rem 0 0.5rem 0;
  color: white
`;

const modal__close=  styled.div`
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
  `;




  

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC_9cAGZnlvSGLKRUMCxIgteTpaMvE83oY',
})(MapWithLocation);
