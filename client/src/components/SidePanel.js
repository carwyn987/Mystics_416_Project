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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isMinimized, setIsMinimized] = React.useState(false);
    const [isMaximized, setIsMaximized] = React.useState(false);
    const [menuText, setMenuText] = React.useState("Choose a district plan to view additional data");
    const [electionDataVisible, setElectionDataVisible] = React.useState(false);
    const [planCompareVisible, setPlanCompareVisible] = React.useState(false);
    const [popDataVisible, setPopDataVisible] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const graph = null;
    let menuItems, enactedPlanData, proposedPlanData, oldPlanData, sidePanelVisible = false, expandIcon = null, panel = null, demVotes = 0, 
    repubVotes = 0, state, stateName, enactedPlanSummary, proposedPlanSummary, oldPlanSummary;
    const TN=1;
    const MS=2;
    const NC=3;

    const getStateFromServer= async (stateId)=>{
        await (fetch(`http://localhost:8080/getState?stateID=${stateId}`).then(response => response.json()).then((response) => {state=response}));
        if(store.enactedPlanToggle){
            fetch(`http://localhost:8080/getDemographics?stateID=${stateId}&planType=${"enacted"}`).then(response => response.json()).then((response) => {enactedPlanData=response});
        }
        if(store.proposedPlanToggle){
            fetch(`http://localhost:8080/getDemographics?stateID=${stateId}&planType=${"proposed"}`).then(response => response.json()).then((response) => {proposedPlanData=response});
        }
        if(store.oldPlanToggle){
            fetch(`http://localhost:8080/getDemographics?stateID=${stateId}&planType=${"old"}`).then(response => response.json()).then((response) => {oldPlanData=response});
        }
        let i =0;
        if(state){
            for(i=0; i<state.districtPlans.length; i++){
                let plan = state.districtPlans[i];
                if(plan.status === 'enacted'){
                    enactedPlanSummary={
                        planId: plan.planId,
                        numDistricts: plan.numDistricts,
                        seatShare: plan.seatShare,
                        numMajMinDistricts: plan.numMajMinDistricts,
                        efficiencyGap: plan.efficiencyGap
                    };
                }
                else if(plan.status === 'proposed'){
                    proposedPlanSummary={
                        planId: plan.planId,
                        numDistricts: plan.numDistricts,
                        seatShare: plan.seatShare,
                        numMajMinDistricts: plan.numMajMinDistricts,
                        efficiencyGap: plan.efficiencyGap
                    };
                }
                else if(plan.status === 'old'){
                    oldPlanSummary={
                        planId: plan.planId,
                        numDistricts: plan.numDistricts,
                        seatShare: plan.seatShare,
                        numMajMinDistricts: plan.numMajMinDistricts,
                        efficiencyGap: plan.efficiencyGap
                    };
                }
            }
        }
        
        console.log("hi");
    }
  
    if(store.currentState){
        sidePanelVisible = true;
        console.log("currentState in sdepanel: "+store.currentState);
        stateName=store.currentState;
        switch(stateName) {
            case "TN":
                stateName = "Tennessee";
                getStateFromServer(TN);
                menuItems= <div>
                                <MenuItem>Enacted Plan</MenuItem>
                                <MenuItem>Proposed Plan</MenuItem>
                            </div> ;
                break;
            case "MS":
                stateName = "Mississippi";
                getStateFromServer(MS);
                break;
            case "NC":
                stateName = "North Carolina";
                getStateFromServer(NC);
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
    const setTab=(event)=>{
        console.log('hi');   
    }

    if(!isMaximized)
        expandIcon=<OpenInFullIcon onClick={toggleMaximize}style={{fontSize:'20pt'}}></OpenInFullIcon>;
    if(menuText==null){
        setMenuText("Choose a district plan from the dropdown");
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    if(store.currentState == "TN"){
        stateName = "Tennessee";
    }
    else if(store.currentState == "MS"){
        stateName = "Mississippi";
    }
    else if(store.currentState == "NC"){
        stateName = "North Carolina";
    }
    let insidePanel=
            
                    <div>
                        <Typography style={{fontWeight:'bold',fontSize:'xx-large',marginTop:'2%',display:'inline-block'}}>Viewing data for {stateName}</Typography>
                        <Box sx={{height:'35%', width: '100%', bgcolor: '#1C274E'}}>
                            <Tabs sx={{paddingTop:'2%',paddingBottom:'2%'}}value={value} onChange={handleChange} centered>
                                <Tab selected className="Tab" onClick={setTab} sx={{color:'white', fontSize:'12pt'}}label="Plan Summary Data" />
                                <Tab selected className="Tab" onClick={setTab} sx={{color:'white', fontSize:'12pt'}}label="Demographics" />
                                <Tab selected className="Tab" onClick={setTab} sx={{color:'white', fontSize:'12pt'}}label="Seat Share" />
                                <Tab selected className="Tab" onClick={setTab} sx={{color:'white', fontSize:'12pt'}}label="Seawulf Data" />
                            </Tabs>
                        </Box>
                        <div style={{fontSize: '25pt', paddingTop:'5%'}}onClick={handleMenu}>
                                {menuText}
                                <ArrowDropDownIcon onClick={handleMenu} style={{display:'inline-block',fontSize:'15pt'}}></ArrowDropDownIcon>
                        </div>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                            transformOrigin={{vertical: 'top', horizontal: 'center'}}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                            >
                            {menuItems}
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