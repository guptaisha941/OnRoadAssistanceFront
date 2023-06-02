import React, { Component, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import './map.css';
import Modal from 'react-modal';
import Button from '../component/Button';
// import { Button, Form } from 'react-bootstrap';
import styled from "styled-components";
import Input from "../component/Input";
import { Button1 } from './Button1';
// import styled from 'styled-components';

class MapWithLocation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      locations: [],
      hospitals: [],
      garages: [],
      showModal: false,
      query: '',
      filteredLocations: [],
    vehicle_number: '',
    vehicle_make: '',
    additional_details: '',
    vehicle_type:''
    };
    this.handleReqFormSubmit = this.handleReqFormSubmit.bind(this);

    const searchParams = new URLSearchParams(props.location.search);
    this.label = searchParams.get("label");
    this.id = searchParams.get("id")
    this.currentPositionName='JK Lakshmipat University'
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
    // window.href.location = "/Request"
  };

  // handleReq(){
  //   window.location.href = "/Request"; // Redirect to the request page
  // };


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
          const geocodingAPIKey = 'AIzaSyC_9cAGZnlvSGLKRUMCxIgteTpaMvE83oY';
        const geocodingAPIUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${geocodingAPIKey}`;
        fetch(geocodingAPIUrl)
          .then(response => response.json())
          .then(data => {
            const currentPositionName = data.results[0].formatted_address;
            console.log(currentPositionName);
            // Update state with current position name
            this.setState({ currentPositionName: currentPositionName });
          })
          .catch(error => console.log(error));
      
        }
      },

      

      () => { console.log('Error getting current position'); });

    // axios.post('http://localhost:5000/api/requests')

    axios.get('http://localhost:5000/api/locations/garages')
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

  async handleReqFormSubmit(event) {
    event.preventDefault();
    const data = {
      email:this.id,
      service_type: this.label,
      location: this.currentPositionName,
      vehicle_number: this.state.vehicle_number,
      vehicle_make: this.state.vehicle_make,
      vehicle_type:this.state.vehicle_type,
      additional_details: this.state.additional_details,
      // assigned_admin:"643d6c12cde7ffc326f04192"
    }
    try {
      const response = await axios.post('http://localhost:5000/api/requests/garage', data,{
        
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      alert('Request submitted successfully');
      // email:this.id,
      // service_type: this.label,
      // location: this.id,
      // vehicle_number: this.state.vehicle_number,
      // vehicle_make: this.state.vehicle_make,
      // additional_details: this.state.additional_details,
      // assigned_admin:"643d6c12cde7ffc326f04192"
      window.location.href = "/Request?id=" + this.id + "&label=" + this.label + "&vn=" + this.state.vehicle_number + "&vm=" + this.state.vehicle_make + "&ad=" + this.state.additional_details + "&lc=" + this.currentPositionName+ "&vt=" + this.state.vehicle_type;

      // +"?id=" +this.id+"?label="+this.label+"?vn="+this.state.vehicle_number+"?vm="+this.state.vehicle_make+"?ad="+this.state.additional_details;
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  



  render() {
    const { google } = this.props;
    const { lat, lng, filteredLocations, hospitals, garages, query, locations } = this.state;

    const handleReq = () => {
    window.location.href = "/Request"; // Redirect to the request page
  };

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
                
                <span style={{
          color: 'brown',
          display: 'inline-block',
          verticalAlign: 'middle',
          // vertical-align: 'middle'
        }}>5&#9733;</span>
                <span className="location-distance">{location.distance} km</span>
              </div>
            ))}
          </div>

          <div className="container">
        <button className="btn" onClick={this.handleRequestClick}
        style={{
          backgroundColor: 'brown',
          color: 'white',
          borderRadius: '20px',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
        }}>
          Request Garage Support
        </button>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleCloseModal}
          style={customStyles}
          contentLabel="Request Hospital"
        >
          <button className="modal__close-button" onClick={this.handleCloseModal}>
  &times;
</button>
          <h2 className="modal-title" style={{
          color: 'brown',
        }}>Request Garage Support</h2>
          
          <form onSubmit={this.handleReqFormSubmit}>
            <InputContainer>
            <WelcomeText> </WelcomeText>
            <Input
              type="text"
              placeholder="Service Type"
              value={this.label}
              onChange={(e) =>
                this.setState({ label: e.target.value })}
              className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              style={{ color: 'black' }}
            />
            <WelcomeText> </WelcomeText>
            <Input
              type="text"
              placeholder="Location"
              className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              style={{ color: 'black' }}
              value={this.currentPositionName}
              onChange={(e) =>
                this.setState({ currentPositionName: e.target.value })}
            />
            <WelcomeText> </WelcomeText>
            <Input
              type="text"
              placeholder="Vehicle Type"
              className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              style={{ color: 'black' }}
              value={this.state.vehicle_type}
              onChange={(e) =>
                this.setState({ vehicle_type: e.target.value })}
            />
            <WelcomeText> </WelcomeText>
            <Input
              type="text"
              placeholder="Vehicle Number"
              className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              style={{ color: 'black' }}
              value={this.state.vehicle_number}
              onChange={(e) =>
                this.setState({ vehicle_number: e.target.value })}
            />
            
            <WelcomeText> </WelcomeText>
            <Input
              type="text"
              placeholder="Vehicle Make"
              className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              style={{ color: 'black' }}
              value={this.state.vehicle_make}
              onChange={(e) =>
                this.setState({ vehicle_make: e.target.value })}
            />

            <WelcomeText> </WelcomeText>
            <Input
              type="text"
              placeholder="Additional Details"
              className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              value={this.state.additional_details}
              onChange={(e) =>
                this.setState({ additional_details: e.target.value })}
            />
            </InputContainer>
            <WelcomeText> </WelcomeText>
            {/* {button1 && <Button buttonStyle='btn--outline'>Submit Request</Button>} */}
            <ButtonContainer>
            <button type='submit' 
            style={{
              backgroundColor: 'brown',
              color: 'white',
              borderRadius: '20px',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
            }}>Submit Request</button>

            {/* <Button content="Submit Request" onClick={(window.href.location="/Request")}/> */}
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
                  location.type === 'garage' ? 'https://maps.google.com/mapfiles/ms/icons/red.png' :
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
