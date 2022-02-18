
import SidePanel from './SidePanel.js'
import MapToggles from './MapToggles.js'
import DistMap from './Map.js';
export default function MapWrapper(){
    return (
        <div class='mapWrapper'>
            <SidePanel/>
            <MapToggles/>
            <DistMap/>
        </div>
    );
}