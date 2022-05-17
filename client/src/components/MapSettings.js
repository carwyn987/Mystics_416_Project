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
import 'animate.css';
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
    const [enactedToggle, setEnactedToggle] = React.useState(true);
    //const [displayToggle, setDisplayToggle] = React.useState(false);
    const [proposedToggle, setProposedToggle] = React.useState(false);
    const [oldToggle, setOldToggle] = React.useState(false);
    const [demToggle, setDemToggle] = React.useState(false);
    const [repToggle, setRepToggle] = React.useState(false);
    let countyToggle, precinctToggle,displayToggle, state, distPlans, planString, planViewTitle, hasOld=false,hasEnacted=false, 
    hasProposed=false,hasDem=false, hasRep=false, firstToggle, secondToggle, thirdToggle, fourthToggle, fifthToggle, title;
    
    const PLAN_NAME={
        ENACTED: "Enacted Plan (Default)",
        PROPOSED: "Proposed Plan",
        OLD: "Previous Plan (2012-2020)",
        DEM: "Democratic Proposed Plan",
        REP: "Republican Proposed Plan"
    }
    const ENACTED = 0
    const PROPOSED = 1
    const OLD = 2
    const DEM = 3
    const REP = 4
   
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
   
    planViewTitle = "View available plans for ";

    switch(store.stateObj?.id){
        case 1:
            state="Tennessee";
            // distPlans=tnDistPlans;
            hasEnacted = true;
            hasProposed= false;
            hasOld=true;
            hasDem= false;
            hasRep= false;
            title="Choose which of Tennessee's district plans you'd like to overlay on the map.";
            break;
        case 2:
            state="Mississippi";
            hasEnacted = true;
            hasProposed= true;
            hasOld= true;
            hasDem= false;
            hasRep= false;
            title="Choose which of Mississippi's district plans you'd like to overlay on the map.";
            // distPlans=miDistPlans;
            break;
        case 3:
            state="North Carolina";
            //distPlans=ncDistPlans;
            hasEnacted = true;
            hasProposed= true;
            hasOld= true;
            hasDem= false;
            hasRep= false;
            title="Choose which of North Carolina's district plans you'd like to overlay on the map.";
            break;
        default:
            state="";
            title="Choose a state to view available district plans.";
            break;
    }

    const toggleEnacted=()=>{
        let newVal = !enactedToggle;
        setEnactedToggle(newVal);
        if(newVal){
            store.enableEnactedPlan();
        }
        else
            store.disableEnactedPlan();
        //INSERT HERE
    }
    const toggleProposed=()=>{
        let newVal = !proposedToggle;
        setProposedToggle(newVal);
        if(newVal){
            store.enableProposedPlan();
        }
        else
            store.disableProposedPlan();         //INSERT HERE
    }
    const toggleOld=()=>{
        let newVal = !oldToggle;
        setOldToggle(newVal);
        if(newVal){
            store.enableOldPlan();
        }
        else
            store.disableOldPlan();
        //INSERT HERE
    }
    const toggleDem=()=>{
        let newVal = !demToggle;
        setDemToggle(newVal);
        if(newVal){
            store.enableDemPlan();
        }
        else
            store.disableDemPlan();        //INSERT HERE
    }
    const toggleRep=()=>{
        let newVal = !repToggle;
        setRepToggle(newVal);
        if(newVal){
            store.enableRepPlan();
        }
        else
            store.disableRepPlan();        //INSERT HERE
    }
    const handleClose=()=>{
        store.closeMapSettings();
    }
    const handleMenu = (event) => {
        state = event.currentTarget;
        setAnchorEl(event.currentTarget);
    };

    if(store.isMapSettingsVisible){
        displayToggle=true;
    }

    let toggleOffIcon = <ToggleOffIcon style={{color:'grey'}} ></ToggleOffIcon>;
    let toggleOnIcon = <ToggleOnIcon style={{color:'chartreuse'}}></ToggleOnIcon>;

    if(!enactedToggle){
        firstToggle = <ToggleOffIcon onClick={toggleEnacted} style={{float:'left',paddingLeft:'5%',paddingRight:'5%',color:'#F0F8FF',display:'inline-block'}}></ToggleOffIcon>;
    }
    else if(enactedToggle){
        firstToggle= <ToggleOnIcon onClick={toggleEnacted} style={{float:'left',paddingLeft:'5%',paddingRight:'5%',color:'chartreuse',display:'inline-block'}}></ToggleOnIcon>;
    }   

    if(!proposedToggle){
        secondToggle = <ToggleOffIcon onClick={toggleProposed} style={{float:'left',paddingLeft:'5%',paddingRight:'5%',color:'#F0F8FF',display:'inline-block'}}></ToggleOffIcon>;
    }
    else if(proposedToggle){
        secondToggle = <ToggleOnIcon onClick={toggleProposed} style={{float:'left',paddingLeft:'5%',paddingRight:'5%',color:'chartreuse',display:'inline-block'}}></ToggleOnIcon>;
    }

    if(!oldToggle){
        thirdToggle=<ToggleOffIcon onClick={toggleOld} style={{float:'left',paddingLeft:'5%',paddingRight:'5%',color:'#F0F8FF',display:'inline-block'}}></ToggleOffIcon>;
    }
    else if(oldToggle){
        thirdToggle= <ToggleOnIcon onClick={toggleOld} style={{float:'left',paddingLeft:'5%',paddingRight:'5%',color:'chartreuse',display:'inline-block'}}></ToggleOnIcon>;
    }

    if(!demToggle){
        fourthToggle=<ToggleOffIcon onClick={toggleDem} style={{float:'left',paddingLeft:'5%',paddingRight:'5%',color:'#F0F8FF',display:'inline-block'}}></ToggleOffIcon>;
    }
    else if(demToggle){
        fourthToggle= <ToggleOnIcon onClick={toggleDem} style={{float:'left',paddingLeft:'5%',paddingRight:'5%',color:'chartreuse',display:'inline-block'}}></ToggleOnIcon>;
    }

    if(!repToggle){
        fifthToggle=<ToggleOffIcon onClick={toggleRep} style={{float:'left',paddingLeft:'5%',paddingRight:'5%',color:'#F0F8FF',display:'inline-block'}}></ToggleOffIcon>;
    }
    else if(repToggle){
        fifthToggle=<ToggleOnIcon onClick={toggleRep} style={{float:'left',paddingLeft:'5%',paddingRight:'5%',color:'chartreuse',display:'inline-block'}}></ToggleOnIcon>;
    }
  
    let allToggles = <div>
                        <div id ="toggle-row" style={{display: hasEnacted ? 'block' : 'none'}}>{firstToggle}<Typography style={{ textAlign:'left', paddingLeft:'10%',fontSize:'18pt'}}>{PLAN_NAME.ENACTED}</Typography></div>
                        <div id ="toggle-row" style={{display: hasProposed ? 'block' : 'none'}}>{secondToggle}<Typography style={{textAlign:'left', paddingLeft:'10%',fontSize:'18pt'}}>{PLAN_NAME.PROPOSED}</Typography></div>
                        <div id ="toggle-row" style={{display: hasOld ? 'block' : 'none'}}>{thirdToggle}<Typography style={{textAlign:'left', paddingLeft:'10%',fontSize:'18pt'}}>{PLAN_NAME.OLD}</Typography></div>
                        <div id ="toggle-row" style={{display: hasDem ? 'block' : 'none'}}>{fourthToggle}<Typography style={{textAlign:'left',paddingLeft:'10%',fontSize:'18pt'}}>{PLAN_NAME.DEM}</Typography></div>
                        <div id ="toggle-row" style={{display: hasRep ? 'block' : 'none'}}>{fifthToggle}<Typography style={{textAlign:'left',paddingLeft:'10%',fontSize:'18pt'}}>{PLAN_NAME.REP}</Typography></div> 
                    </div>;
    
    return(
        <div className="animate__animated animate__fadeInRightBig" id='map-settings' style={{display: displayToggle ? 'inline-block': 'none'}}>
            <div>
                <Typography style={{fontWeight:'bold', display:'inline-block', margin:'auto'}}>SETTINGS</Typography>
                <CloseIcon onClick = {handleClose}style={{display: 'inline-block', float:'right'}}></CloseIcon>
            </div>
            <Box id='settings-block' style={{height:'80%'}}>
                <Typography style={{ paddingLeft:'5%', paddingRight: '5%', fontSize:'20pt', fontWeight:'bold'}}> {title} <br></br></Typography>
                <div id='togglesBox'style={{height:'25%',paddingTop:'8%'}}>
                    {allToggles}
                </div>
            </Box>
        </div>
    );
}