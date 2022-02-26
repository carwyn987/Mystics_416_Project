// import logo from './logo.svg';
import React from 'react';
import './App.css';
import AppToolbar from './AppToolbar.js';
import AppBanner from './AppBanner';
import MapWrapper from './MapWrapper.js';
import { GlobalStoreContextProvider } from './DataStore.js';
//import TNDistricts from './districts/TNDistricts.js';

function App() {
  return (
    //<GlobalStoreContextProvider>
      <div className="App">
        <GlobalStoreContextProvider>
          <AppToolbar/>
          <MapWrapper/>
        </GlobalStoreContextProvider>
      </div>
    //</GlobalStoreContextProvider>
  );
}

export default App;
