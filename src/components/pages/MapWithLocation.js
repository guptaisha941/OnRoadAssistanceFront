// import React, { useEffect, useState } from "react";
// import Map from "ol/Map";
// import View from "ol/View";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import Feature from "ol/Feature";
// import Point from "ol/geom/Point";
// import { fromLonLat } from "ol/proj";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// // import { Icon } from 'ol/style';
// import { Icon, Style } from 'ol/style';  // Import Style and Icon from ol/style

// const MapWithLocation = () => {
//   const [map, setMap] = useState(null);
  

//   useEffect(() => {
//     const initialMap = new Map({
//       target: "map-container",
//       layers: [
//         new TileLayer({
//           source: new OSM(),
//         }),
//       ],
//       view: new View({
//         center: fromLonLat([0, 0]),
//         zoom: 2,
//       }),
//     });
//     setMap(initialMap);
//   }, []);

//   useEffect(() => {
//     if (map) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const longitude = position.coords.longitude;
//           const latitude = position.coords.latitude;

//           // Create a marker for your location
//           const marker = new Feature({
//             geometry: new Point(fromLonLat([longitude, latitude])),
//           });

//           // Create a new style for the marker using IconStyle
//           const iconStyle = new Style({
//             image: new Icon({
//               src: "https://openlayers.org/en/latest/examples/data/icon.png",
//             }),
//           });

//           // Create a vector source and add the marker feature to it
//           const vectorSource = new VectorSource({
//             features: [marker],
//           });
//           marker.setStyle(iconStyle);

//           // Add the vector layer to the map
//           const vectorLayer = new VectorLayer({
//             source: vectorSource,
//           });
//           map.addLayer(vectorLayer);

//           // Set the view to your location
//           map.getView().setCenter(fromLonLat([longitude, latitude]));
//           map.getView().setZoom(15);
//         },
//         (error) => {
//           console.error(error);
//         }
//       );
//     }
//   }, [map]);


//   return <div id="map-container" style={{ height: "500px" }}></div>;
// };

// export default MapWithLocation;

// *********************************OPEN LAYERS CODE********************************************************



import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';

class MapWithLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      locations:[],
      hospitals: [
        // {
        //   name: 'Malot Hospital',
        //   lat: 26.8436,
        //   lng: 75.6551,
        // },
        // {
        //   name: 'Garhwal Family',
        //   lat: 26.8505,
        //   lng: 75.6508,
        // },
        // {
        //   name: 'Rawal Hospital',
        //   lat: 26.871816910738366,
        //   lng: 75.70065283851683,
        // },
      ],
      garages: [
        // {
        //   name: 'Audi Jaipur',
        //   lat: 26.917302544974202,
        //   lng: 75.80350139710916,
        // },
        // {
        //   name: 'Haighway Automobiles',
        //   lat: 26.85303633764573,
        //   lng: 75.64782261245408,
        // },
      ],
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
    );

    axios.get('http://localhost:5000/api/locations')
      .then(response => {
        if (this._isMounted){
          this.setState({
            locations: response.data
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
        {locations.map((location) => (
          <Marker
            key={location.name}
            name={location.name}
            position={{ lat: location.lat, lng: location.lng }}
            icon={{
              url: location.type === 'Hospital'?
               'https://maps.google.com/mapfiles/ms/icons/hospitals.png'
               : 'https://maps.google.com/mapfiles/ms/icons/gas.png',
              anchor: new google.maps.Point(16, 16),
              scaledSize: new google.maps.Size(32, 32),
            }}
          />
        ))}
        {/* {garages.map((location) => (
          <Marker
            key={location.name}
            name={location.name}
            position={{ lat: location.lat, lng: location.lng }}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue.png',
              anchor: new google.maps.Point(16, 16),
              scaledSize: new google.maps.Size(32, 32),
            }} */}
          {/* /> */}
        {/* ))} */}
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
})(MapWithLocation);
