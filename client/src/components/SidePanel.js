import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import MinimizeIcon from '@mui/icons-material/Minimize';import Box from '@mui/material/Box';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ExpandIcon from '@mui/icons-material/Expand';import Draggable from 'react-draggable';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { GlobalStore } from './DataStore'
import ElectionData from './ElectionData';
import PopulationData from './PopulationData';
import PlanComparison from './PlanComparison';
import * as React from 'react';
import {useContext, useEffect} from 'react';
import CottageIcon from '@mui/icons-material/Cottage';
import 'animate.css';
import PopulationGraph from './PopulationGraph.js';


export default function SidePanel(){
    const  { store } = useContext(GlobalStore);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isMinimized, setIsMinimized] = React.useState(false);
    const [isMaximized, setIsMaximized] = React.useState(false);
    const [menuText, setMenuText] = React.useState("NONE SELECTED");
   
    const [state, setSwitchState] = React.useState(1);
    const graph = null;
    let isVisible = false, expandIcon = null, panel = null, demVotes = 0, repubVotes = 0, currentState = null, currentPlan = null;
;
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const toggleMinimize=()=>{
        if(isMaximized){
            setIsMinimized(false);
            setIsMaximized(false);
        }
        else
            setIsMinimized(true);
    }

    const toggleMaximize=()=>{
        if(isMinimized){
            setIsMinimized(false);
            setIsMaximized(false);
        }
        else
            setIsMaximized(true);
    }

    const toggleState=()=>{
        console.log("toggleState, SidePanel");
        if (state === 1){
            setSwitchState(2);
        } else{
            setSwitchState(1);
        }
        console.log("state is: " + state);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    if(store.currentState){
        switch(store.currentState){
            case("TN"):
                currentState = "TENNESSEE";
                break;
            case("MS"):
                currentState = "MISSISSIPPI";
                break;
            case("NC"):
                currentState = "NORTH CAROLINA";
                break
            default:
                break;
        }
    }
    if(store.isSidePanelVisible)
        isVisible=true;
    else
        isVisible=false;

    if(!isMaximized)
        expandIcon=<OpenInFullIcon onClick={toggleMaximize}style={{fontSize:'20pt'}}></OpenInFullIcon>;

    let insidePanel=
                <div>
                    <div style={{display:'inline-block',float:'left', fontSize:'20pt',paddingTop:'2%',paddingLeft:'1%'}}>
                        <MinimizeIcon onClick={toggleMinimize} style={{fontSize:'20pt'}}></MinimizeIcon>
                        {expandIcon}
                        <CottageIcon onClick={toggleState} style={{fontSize:'15pt'}}></CottageIcon>
                    </div>         
                    <div onClick={handleMenu}>
                    <Typography style={{fontSize:'x-large',marginTop:'8%',marginRight:'17%',marginBottom:'5%',display:'inline-block'}}>VIEW DATA FOR: <br></br> {currentState} {/*, DISTRICT {store.currentDistrict}*/}</Typography>
                        <Button variant="outlined" style={{width:'400px',fontSize:'25pt',borderColor:'white',fontSize:'large',marginRight:'5%',color:'white'}}>
                            {menuText}
                            <ArrowDropDownIcon onClick={handleMenu} style={{display:'inline-block',fontSize:'15pt'}}></ArrowDropDownIcon>
                        </Button>
                    </div>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        // anchorOrigin={{
                        // vertical: 'bottom',
                        // horizontal: 'right',
                        // }}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                        transformOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        >
                    </Menu>
                    {/* <div id="pop-container"> */}
                        <PopulationGraph></PopulationGraph>
                    {/* </div> */}
                </div>
    
    if(isMaximized){
        panel=
                <div style={{height: '600px', width:'1000px',overflow:'scroll'}}>
                    {insidePanel}
                </div>;
    }
    else if(isMinimized){
        panel=
                <div style={{width: '100px',height:'1%', top:'1%'}}>
                    <OpenInFullIcon onClick={toggleMaximize} style={{display: 'inline-block',borderRadius:'15px', top: '-10%'}}></OpenInFullIcon>
                    <Box>
                            View Data
                    </Box>
                </div>;
    }
    else{
        panel=<div style={{height: '600px', width: '650px', overflow:'scroll'}}>
                {insidePanel}
            </div>;
    }
    
   return(
        <div class='sidePanel' style={{display: isVisible ? 'block' : 'none'}}>
                {panel}
        </div>
    );
}