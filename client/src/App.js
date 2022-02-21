// import logo from './logo.svg';
import React from 'react';
import './App.css';
import AppToolbar from './AppToolbar.js';
import MapWrapper from './MapWrapper.js';
//import TNDistricts from './districts/TNDistricts.js';

function App() {
  return (
    <div className="App">
      <AppToolbar/>
      <MapWrapper/>
      {/* <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        initialViewState={{
          longitude: -95.953,
          latitude: 38.473,
          zoom: 3.87
        }}
        style={{width: '100vw', height: '100vh'}}
      >
      <TNDistricts />
      </ReactMapGL> */}
    </div>
  );
}

export default App;
