import * as React from 'react';
import Typography from '@mui/material/Typography';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import MinimizeIcon from '@mui/icons-material/Minimize';import Box from '@mui/material/Box';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { borders } from '@mui/system';
import {useState} from 'react';
import './App.css';
import Draggable from 'react-draggable';
import { useContext } from 'react';
import { GlobalStore } from './DataStore.js';


export default function MapToggles(){
    const { store } = useContext(GlobalStore);
    const [isDistrictToggleSet, setDistrictToggle] = React.useState(false);
    const [isCountyToggleSet, setCountyToggle] = React.useState(false);
    const [isPrecinctToggleSet, setPrecinctToggle] = React.useState(false);
    const [isMinimized, setMinimized] = React.useState(false);
    let mapToggles;
    let districtToggle;
    let countyToggle;
    let precinctToggle;

    const handleCongClick =()=>{
        let current = !isDistrictToggleSet;
        setDistrictToggle(current);
    }
    const handleCountyClick=()=>{
        let current = !isCountyToggleSet;
        setCountyToggle(current);
        if (current) {
            //if (store.countyState === 1) {
                store.map.setLayoutProperty('tn-county-layer', 'visibility', 'visible');
                //store.map.setLayoutProperty('ms-county-layer', 'visibility', 'none');
            //} else if (store.countyState === 2) {
                store.map.setLayoutProperty('ms-county-layer', 'visibility', 'visible');
                //store.map.setLayoutProperty('tn-county-layer', 'visibility', 'none');
            //}
        } else {
            store.map.setLayoutProperty('tn-county-layer', 'visibility', 'none');
            store.map.setLayoutProperty('ms-county-layer', 'visibility', 'none');
        }
        //setCountyToggle(current);
    }
    const handlePrecClick=()=>{
        let current = !isPrecinctToggleSet;
        setPrecinctToggle(current);
    }

    if(isDistrictToggleSet){
        districtToggle=<ToggleOnIcon style={{color:'chartreuse'}} id='toggleon-icon'></ToggleOnIcon>;
    }
    else{
        districtToggle=<ToggleOffIcon style={{color:'gainsboro'}} id='toggleoff-icon' ></ToggleOffIcon>;
    }

    if(isCountyToggleSet){
        countyToggle=<ToggleOnIcon style={{color:'chartreuse'}} id='toggleon-icon' ></ToggleOnIcon>;
    }
    else{
        countyToggle=<ToggleOffIcon style={{color:'gainsboro'}} id='toggleoff-icon' ></ToggleOffIcon>;
    }

    if(isPrecinctToggleSet){
        precinctToggle=<ToggleOnIcon  style={{color:'chartreuse'}} id='toggleon-icon' ></ToggleOnIcon>;
    }
    else{
        precinctToggle=<ToggleOffIcon style={{color:'gainsboro'}} id='toggleoff-icon'></ToggleOffIcon>;
    }
    const handleWinChange=()=>{
        //console.log("button clicked!!!!!!!!!");
        let truth = !isMinimized;
        setMinimized(truth);
    }

    let defaultMapToggles=
    <Box id='map-toggles' style={{width: '350px', height:'175px'}}>
        <MinimizeIcon onClick={handleWinChange} style={{ display:'inline-block',fontSize:'20pt', fontWeight:'bold',float:'left',paddingBottom:'5%'}}></MinimizeIcon><br></br>
        <Typography style={{fontSize:'12pt',fontWeight:'bold'}}> Choose Boundary Definitions<br></br></Typography>
        <div>
            <br></br>
            {/* <div className= "toggle-row" onClick={handleCongClick}>
                {districtToggle}<div style={{display:'inline-block', paddingLeft:'4%',fontSize:'20pt'}}>Congressional Districts</div>
            </div> */}
            <div className= "toggle-row" onClick={handleCountyClick}>
                {countyToggle}<div style={{display:'inline-block', paddingLeft:'4%',fontSize:'20pt'}}>Counties</div>
            </div>
            <div className= "toggle-row" onClick={handlePrecClick}>
                {precinctToggle}<div style={{display:'inline-block', paddingLeft:'4%',fontSize:'20pt'}}>Precincts</div>
            </div>
        </div>
    </Box>;
    let minimizedMapToggles= 
    <Box id='map-toggles' style={{width: '300px', height:'30px'}}>
        <OpenInFullIcon onClick={handleWinChange} style={{ fontSize:'20pt', fontWeight:'bold',float:'left'}}></OpenInFullIcon>
        <Typography style={{fontSize:'15pt',fontWeight:'bold'}}>Boundary Definitions</Typography>
    </Box>;
    if(isMinimized){
        mapToggles=minimizedMapToggles;
    }
    else{
        mapToggles=defaultMapToggles;
    }
    return(
        <div> 
            <Draggable bounds="body" defaultPosition={{x:1300, y:0}}>
                {mapToggles} 
            </Draggable>
        </div>
    );
}