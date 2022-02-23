import * as React from 'react';
import Typography from '@mui/material/Typography';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import './App.css';


export default function MapToggles(){
    const [isDistrictToggleSet, setDistrictToggle] = React.useState(false);
    const [isCountyToggleSet, setCountyToggle] = React.useState(false);
    const [isPrecinctToggleSet, setPrecinctToggle] = React.useState(false);
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
        districtToggle=<ToggleOnIcon></ToggleOnIcon>;
    }
    else{
        districtToggle=<ToggleOffIcon></ToggleOffIcon>;
    }

    if(isCountyToggleSet){
        countyToggle=<ToggleOnIcon></ToggleOnIcon>;
    }
    else{
        countyToggle=<ToggleOffIcon></ToggleOffIcon>;
    }

    if(isPrecinctToggleSet){
        precinctToggle=<ToggleOnIcon></ToggleOnIcon>;
    }
    else{
        precinctToggle=<ToggleOffIcon></ToggleOffIcon>;
    }

    return(
        <div class='mapToggles' /*className="characters" {...provided.droppableProps} ref={provided.innerRef}*/>
            <Typography style={{fontSize:'x-large'}}> Choose a Boundary Definition:<br></br></Typography>
            <div>
                <br></br>
                <div className= "toggle-row" style={{fontSize:'20pt'}} onClick={handleCongClick}>
                    {districtToggle}
                     Congressional Districts
                </div>
                <div className= "toggle-row" style={{fontSize:'20pt'}} onClick={handleCountyClick}>
                    {countyToggle}
                     Counties
                </div>
                <div className= "toggle-row" style={{fontSize:'20pt'}} onClick={handlePrecClick}>
                    {precinctToggle}
                     Precincts
                </div>
            </div>
        </div>
    )
}