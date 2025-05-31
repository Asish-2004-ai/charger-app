import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import axios from '../api/axios';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 20.5937, // Default center (India)
  lng: 78.9629
};

function MapView() {
  const [chargers, setChargers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    axios.get('/chargers').then(res => setChargers(res.data));
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
      {chargers.map((charger) => (
        <Marker
          key={charger._id}
          position={{ lat: charger.latitude, lng: charger.longitude }}
        />
      ))}
    </GoogleMap>
  );
}

export default MapView;
