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
import CenteredTabs from './CenteredTabs';
import * as React from 'react';
import {useContext, useEffect} from 'react';
import CottageIcon from '@mui/icons-material/Cottage';
import 'animate.css';
import PopulationGraph from './PopulationGraph.js';

const TN = 1;
const MS = 2;
const NC = 3;

//The summary will include data for each of the districtings including identifier, number of majority-minority districts, 
//equal population measure, Polsby-Popper value, Republican/Democratic split, and other implemented measure values. The 
//display should also include the number of total minority districts if that optional use case was completed.

export default function SidePanel(){
    let  { store } = useContext(GlobalStore);
    let state;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isMinimized, setIsMinimized] = React.useState(false);
    const [isMaximized, setIsMaximized] = React.useState(false);
    const [menuText, setMenuText] = React.useState("NONE SELECTED");
    const [electionDataVisible, setElectionDataVisible] = React.useState(false);
    const [planCompareVisible, setPlanCompareVisible] = React.useState(false);
    const [popDataVisible, setPopDataVisible] = React.useState(false);
    //const [sidePanelVisible, setPanelVis] = React.useState(false);
    const graph = null;
    let sidePanelVisible = false, expandIcon = null, panel = null, demVotes = 0, repubVotes = 0, stateName;

    const setState=(response)=>{
        state=response;
        console.log('HELP');
    }

    if(store.currentState){
        sidePanelVisible = true;
        console.log("currentState in sdepanel: "+store.currentState);
        stateName=store.currentState;
        switch(stateName) {
            case "TN":
                stateName = "Tennessee";
                fetch(`http://localhost:8080/getState?stateID=${TN}`).then(response => response.json()).then(response => {setState(response)});
                break;
            case "MS":
                stateName = "Mississippi";
                fetch(`http://localhost:8080/getState?stateID=${MS}`).then(response => response.json()).then(response => {setState(response)});
                break;
            case "NC":
                stateName = "North Carolina";
                fetch(`http://localhost:8080/getState?stateID=${NC}`).then(response => response.json()).then(response => {setState(response)});
                break;
            default:
                break;
        }
    }
   
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
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
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    let enabledPlans="";
    if(store.enactedPlanToggle){
        enabledPlans+="enacted";
        console.log("YAS");
    }
    if(store.proposedPlanToggle){
        enabledPlans+="proposed";
        console.log("f");
    }
    if(store.oldPlanToggle){
        enabledPlans+="old";
        console.log("F");
    }
    if(store.demPlanToggle){
        enabledPlans+="dem";
        console.log("f");

    }
    if(store.repPlanToggle){
        enabledPlans+="rep";
        console.log("f");

    }

    if(!isMaximized)
        expandIcon=<OpenInFullIcon onClick={toggleMaximize}style={{fontSize:'20pt'}}></OpenInFullIcon>;
    let insidePanel=
                <div>
                    <Typography style={{fontWeight:'bold',fontSize:'xx-large',marginTop:'2%',display:'inline-block'}}>Viewing data for {stateName}{enabledPlans}</Typography>
                    <CenteredTabs></CenteredTabs>
                    <div style={{display:'inline-block',float:'left', fontSize:'20pt',paddingTop:'2%',paddingLeft:'1%'}}></div>         
                    <div onClick={handleMenu}>
                        <Button variant="outlined" style={{width:'400px',fontSize:'25pt',borderColor:'white',fontSize:'large',marginRight:'5%',color:'white'}}>
                            {menuText}
                            <ArrowDropDownIcon onClick={handleMenu} style={{display:'inline-block',fontSize:'15pt'}}></ArrowDropDownIcon>
                        </Button>
                    </div>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                        transformOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        >
                        {/* <MenuItem onClick={handleElectionClick}>Election Data</MenuItem>
                        <MenuItem onClick={handleCompareClick}>Compare Plans</MenuItem>
                        <MenuItem onClick={handlePopClick}>Demographics</MenuItem> */}
                    </Menu>
                    <PopulationGraph></PopulationGraph>
                </div>
    
  
    panel=<div style={{height: '1000px', width: '900px'}}>
            {insidePanel}
          </div>;

    
   return(
        <div class='sidePanel' style={{display: sidePanelVisible ? 'block' : 'none'}}>
                {panel}
        </div>
    );
}