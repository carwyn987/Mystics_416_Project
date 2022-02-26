import React from 'react'
import SidePanel from './SidePanel.js'
import MapToggles from './MapToggles.js'
import DistMap from './Map.js';
import AppToolbar from './AppToolbar.js';

export default function MapWrapper(){
    return (
        <div class='mapWrapper'>
            <AppToolbar/>
            <SidePanel/>
            <MapToggles/>
            <DistMap/>
        </div>
    );
}