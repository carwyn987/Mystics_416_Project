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
    const [currentPlan, setCurrentPlan] = React.useState(null);
    let countyToggle, precinctToggle, displayToggle, state, distPlans, planString, planViewTitle;
    
    const PLAN_NAME={
        ENACTED: "Enacted Plan",
        PROPOSED: "Proposed Plan",
        OLD: "Previous Plan (2012-2020)",
        DEM: "Proposed Plan from Democratic Party",
        REP: "Proposed Plan from Republican Party"
    }
    const ENACTED = 0
    const PROPOSED = 1
    const OLD = 2
    const DEM = 3
    const REP = 4
    

    // const setPlan = (p) => {
    //     console.log(p);
    //     store.setDistrictPlan(PLAN_NAME[p]);
    // }

    const handlePlanClick = (e) => {
        if(e.target.textContent==PLAN_NAME.ENACTED){
            store.setDistrictPlan(ENACTED);
            planString = PLAN_NAME.ENACTED;
        }
        else if (e.target.textContent==PLAN_NAME.PROPOSED) {
            store.setDistrictPlan(PROPOSED);
            planString = PLAN_NAME.PROPOSED;
        }
        else if (e.target.textContent==PLAN_NAME.OLD) {
            store.setDistrictPlan(OLD);
            planString = PLAN_NAME.OLD;
        }
        else if (e.target.textContent==PLAN_NAME.DEM) {
            store.setDistrictPlan(DEM);
            planString = PLAN_NAME.DEM;
        }
        else if(e.target.textContent==PLAN_NAME.REP){
            store.setDistrictPlan(REP);
            planString = PLAN_NAME.REP;
        }
        console.log(store.districtPlan);
    }

    let tnDistPlans=<div>
                        <MenuItem onClick={handlePlanClick}>Enacted Plan</MenuItem>
                        <MenuItem onClick={handlePlanClick}>Previous Plan (2012-2020)</MenuItem> 
                    </div>;
    let miDistPlans=<div>
                        <MenuItem onClick={handlePlanClick}>Enacted Plan</MenuItem>
                        <MenuItem onClick={handlePlanClick}>Proposed by Democratic Party</MenuItem>
                        <MenuItem onClick={handlePlanClick}>Previous Plan (2012-2020)</MenuItem>
                    </div>;
    let ncDistPlans=<div>
                        <MenuItem onClick={handlePlanClick}>Enacted Plan</MenuItem>
                        <MenuItem onClick={handlePlanClick}>Proposed</MenuItem>
                        <MenuItem onClick={handlePlanClick}>Previous Plan (2012-2020)</MenuItem>
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
        setMenuChoice=("MS");
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

    // const setPlan=(planID)=>{
    //     store.setDistrictPlan(planID);
    // }
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

    if(store.isMapSettingsVisible)
        displayToggle=true;
    
    planViewTitle = "View available plans for ";
    switch(store.stateFocus){
        case "TN":
            state="Tennessee";
            distPlans=tnDistPlans;
            break;
        case "MS":
            state="Mississippi";
            distPlans=miDistPlans;
            break;
        case "NC":
            state="North Carolina";
            distPlans=ncDistPlans;
            break;
        default:
            state="";
            planViewTitle="Choose a state to view available district plans.";
            break;
    }

    return(
        <div class="animate__animated animate__fadeInRightBig" id='map-settings' style={{display: displayToggle ? 'inline-block': 'none'}}>
            <div>
                <Typography style={{fontWeight:'bold', display:'inline-block', margin:'auto'}}>SETTINGS</Typography>
                <CloseIcon onClick = {handleClose}style={{display: 'inline-block', float:'right'}}></CloseIcon>
            </div>
            <Box id='settings-block'>
                <Typography style={{fontSize:'12pt'}}> Choose Boundary Definitions<br></br></Typography>
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
                <Typography style={{fontSize:'12pt'}}>{planViewTitle} <Typography style={{fontWeight:'bold', fontSize: '12pt'}}>{state}</Typography><br></br></Typography>
                <Typography>Currrent Plan: {planString}<ArrowDropDownIcon style={{fontSize:'12pt'}}onClick={handleMenu}>Enacted Plan</ArrowDropDownIcon></Typography>
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