
import SidePanel from './SidePanel.js'
import MapToggles from './MapToggles.js'
import DistMap from './Map.js';
import { DragDropContext } from 'react-beautiful-dnd';

export default function MapWrapper(){
    return (
        <div class='mapWrapper'>
            <SidePanel/>
            <DragDropContext>
                <MapToggles/>
            </DragDropContext>
            <DistMap/>
        </div>
    );
}