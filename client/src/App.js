// import logo from './logo.svg';
import React from 'react';
import ReactMapGL from 'react-map-gl';
import './App.css';

function App() {
  return (
    <div className="App">
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        initialViewState={{
          longitude: -95.953,
          latitude: 38.473,
          zoom: 3.87
        }}
        style={{width: '100vw', height: '100vh'}}
      >
      </ReactMapGL>
    </div>
  );
}

export default App;
