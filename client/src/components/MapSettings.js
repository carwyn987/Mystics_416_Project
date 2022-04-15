import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import GlobalStore from './DataStore.js'
import * as React from 'react'
import {useContext} from 'react'
import 'animate.css'
import Button from '@mui/material/Button';
import '../App.css';

export default function MapSettings(){
    const {store} = useContext(GlobalStore);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isCountyToggleSet, setCountyToggle] = React.useState(false);
    const [isPrecinctToggleSet, setPrecinctToggle] = React.useState(false);
    const [menuChoice, setMenuChoice] = React.useState("");
    const [availablePlans, setAvailablePlans] = React.useState(null);
    let countyToggle, precinctToggle, displayToggle, state, distPlans, plans;
    
    const PLAN_TYPE={
        ENACTED:1,
        PROPOSED:2,
        OLD:3,
        DEM:4,
        REP:5
    }
    let tnDistPlans=<div>
                        <MenuItem>Enacted Plan</MenuItem>
                        <MenuItem>Previous Plan (2012-2020)</MenuItem> 
                    </div>;
    let miDistPlans=<div>
                        <MenuItem>Enacted</MenuItem>
                        <MenuItem>Proposed by Democratic Party</MenuItem>
                        <MenuItem>Previous Plan (2012-2020)</MenuItem>
                    </div>;
    let ncDistPlans=<div>
                        <MenuItem>Enacted </MenuItem>
                        <MenuItem>Proposed</MenuItem>
                        <MenuItem>Previous Plan (2012-2020)</MenuItem>
                    </div>;
    const handleCountyClick=()=>{
        let current = !isCountyToggleSet;
        setCountyToggle(current);
        //store.toggleCounty();
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
    const handleTenClick=()=>{
        setMenuChoice("TN");
    }
    const handleMisClick=()=>{
        setMenuChoice=("MI");
    }
    const handleClose=()=>{
        store.closeMapSettings();
    }
    const handleMenu = (event) => {
        state = event.currentTarget;
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = (event) =>{
        setAnchorEl(null);
    }
    const availPlans=(plans)=>{
        setAvailablePlans(plans);
    }
    const setPlan=(planID)=>{
        store.setDistrictPlan(planID);
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
    if(store.stateFocus){
        let theState=store.stateFocus
        switch(theState){
            case "Tennessee":
                distPlans=tnDistPlans;
                break;
            case "Mississippi":
                distPlans = miDistPlans;
                break;
            case "North Carolina":
                distPlans = ncDistPlans; 
                break;
        }
    }

    if(store.isMapSettingsVisible)
        displayToggle=true;
    
    if(store.stateFocus == "TN"){
        state="Tennessee";
    }
    else if(store.stateFocus=="MI"){
        state="Mississippi";
    }
    else if(store.stateFocus=="NC"){
        state="North Carolina";
    }

    

    return(
        <div class="animate__animated animate__fadeInRightBig" id='map-settings' style={{display: displayToggle ? 'inline-block': 'none'}}>
            <div>
                <Typography style={{fontWeight:'bold', display:'inline-block', margin:'auto'}}>SETTINGS</Typography>
                <CloseIcon onClick = {handleClose}style={{display: 'inline-block', float:'right'}}></CloseIcon>
            </div>
            <Box id='settings-block'>
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
            </Box>
            <br></br> 
            <Box id='settings-block'>
                <Typography style={{fontSize:'12pt',fontWeight:'bold'}}>Choose District Plan to View for {store.stateFocus}<br></br></Typography>
                <Typography style={{fontSize:'18pt'}}>{state}</Typography>
                <Typography>Currrent Plan: Enacted<ArrowDropDownIcon style={{fontSize:'12pt'}}onClick={handleMenu}>Approved Plan</ArrowDropDownIcon></Typography>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    transformOrigin={{vertical: 'top', horizontal: 'center'}}
                        // anchorOrigin={{
                    //   vertical: 'bottom',
                    //   horizontal: 'right',
                    // }}
                    keepMounted
                    // transformOrigin={{
                    //   vertical: 'top',
                    //   horizontal: 'right',
                    // }}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    >
                    <div>{distPlans}</div>
              </Menu>
            </Box>
        </div>
    );
}