import * as React from 'react';
import Typography from '@mui/material/Typography';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import MinimizeIcon from '@mui/icons-material/Minimize';import Box from '@mui/material/Box';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { borders } from '@mui/system';
import {useState} from 'react';
import './App.css';


export default function MapToggles(){
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
    }
    const handlePrecClick=()=>{
        let current = !isPrecinctToggleSet;
        setPrecinctToggle(current);
    }

    if(isDistrictToggleSet){
        districtToggle=<ToggleOnIcon style={{color:'chartreuse'}} id='toggleon-icon'></ToggleOnIcon>;
    }
    else{
        districtToggle=<ToggleOffIcon style={{color:'gray'}} id='toggleoff-icon' ></ToggleOffIcon>;
    }

    if(isCountyToggleSet){
        countyToggle=<ToggleOnIcon style={{color:'chartreuse'}} id='toggleon-icon' ></ToggleOnIcon>;
    }
    else{
        countyToggle=<ToggleOffIcon style={{color:'gray'}} id='toggleoff-icon' ></ToggleOffIcon>;
    }

    if(isPrecinctToggleSet){
        precinctToggle=<ToggleOnIcon  style={{color:'chartreuse'}} id='toggleon-icon' ></ToggleOnIcon>;
    }
    else{
        precinctToggle=<ToggleOffIcon style={{color:'gray'}} id='toggleoff-icon'></ToggleOffIcon>;
    }
    const handleWinChange=()=>{
        console.log("button clicked!!!!!!!!!");
        let truth = !isMinimized;
        setMinimized(truth);
    }

    let defaultMapToggles=
    <Box id='map-toggles' style={{width: '500px', height:'275px'}}>
        <MinimizeIcon onClick={handleWinChange} style={{ fontSize:'25pt', fontWeight:'bold',float:'left', floatBottom:'4%'}}></MinimizeIcon><br></br>
        <Typography style={{fontSize:'20pt',fontWeight:'bold',paddingTop:'4%'}}> Choose a Boundary Definition<br></br></Typography>
        <div>
            <br></br>
            <div className= "toggle-row" onClick={handleCongClick}>
                {districtToggle}<div style={{display:'inline-block', paddingLeft:'4%',fontSize:'25pt'}}>Congressional Districts</div>
            </div>
            <div className= "toggle-row" onClick={handleCountyClick}>
                {countyToggle}<div style={{display:'inline-block', paddingLeft:'4%',fontSize:'25pt'}}>Counties</div>
            </div>
            <div className= "toggle-row" onClick={handlePrecClick}>
                {precinctToggle}<div style={{display:'inline-block', paddingLeft:'4%',fontSize:'25pt'}}>Precincts</div>
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
        {mapToggles}</div>
    );
}