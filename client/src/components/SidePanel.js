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
import { DataGrid } from '@mui/x-data-grid';
import 'animate.css';
import PopulationGraph from './PopulationGraph.js';

import Grid from '@mui/material/Grid';

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
    //const [stateName, setStateName] = React.useState(null);
    const [value, setValue] = React.useState(0);
    // const[enactedPlanSummaryData, setEnactedPlanSummaryData] = React.useState(null);
    const graph = null;
    let menuItems, enactedPlanSummaryData, stateName,proposedPlanData, oldPlanData, sidePanelVisible = false, expandIcon = null, panel = null, demVotes = 0, 
    repubVotes = 0, state, enactedSummaryRow, proposedSummaryRow, oldSummaryRow, enactedPlanSummary, proposedPlanSummary, oldPlanSummary;
    const TN=1;
    const MS=2;
    const NC=3;

    const setTab=(event)=>{
        console.log('hi');   
    }

    if(menuText==null){
        setMenuText("Choose a district plan from the dropdown");
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
   
    if(enactedPlanSummaryData){
        enactedSummaryRow=<div>{enactedPlanSummaryData.planId}</div>;
        console.log('klit');
    }
   
    if(store.currentState == "TN"){
        sidePanelVisible = true;
       // stateName="Tennessee";
        // setStateName("Tennessee");
        // getStateData(TN);
    }
    else if(store.currentState == "MS"){
        sidePanelVisible=true;
       // stateName="Mississippi";
        // setStateName("Mississippi");
        // getStateData(MS);
    }
    else if(store.currentState == "NC"){
        sidePanelVisible=true;
        //stateName="North Carolina";
        // setStateName("North Carolina");
        // getStateData(NC);
    }
    if(store.stateObj){
        let i =0;
        let enactedSummaryData,proposedSummaryData,oldSummaryData,state=store.stateObj;
        if(state){
            switch(state.id){
                case 1:
                    stateName = "Tennessee";
                    break;
                case 2:
                    stateName="Mississippi";
                    break;
                case 3:
                    stateName="North Carolina";
                    break;
                default:
                    break;
            }
            for(i=0; i<state.districtPlans.length; i++){
                let plan = state.districtPlans[i];  
                let equalPop = (1/plan.numDistricts);
                //Number of districts - seatShare
                if(plan.status==="enacted"){
                    enactedSummaryData={
                        planId: plan.planId,
                        numDistricts: plan.numDistricts,
                        seatShare: plan.seatShare,
                        numMajMinDistricts: plan.numMajMinDistricts,
                        polsbyPopper: plan.polsbyPopper,
                        equalPop: equalPop,
                        efficiencyGap: plan.efficiencyGap
                    };
                }
                else if(plan.status==="proposed"){
                    proposedSummaryData={
                        planId: plan.planId,
                        numDistricts: plan.numDistricts,
                        seatShare: plan.seatShare,
                        numMajMinDistricts: plan.numMajMinDistricts,
                        polsbyPopper: plan.polsbyPopper,
                        equalPop: equalPop,
                        efficiencyGap: plan.efficiencyGap
                    };
                }
                else if(plan.status==="old"){
                    oldSummaryData={
                        planId: plan.planId,
                        numDistricts: plan.numDistricts,
                        seatShare: plan.seatShare,
                        numMajMinDistricts: plan.numMajMinDistricts,
                        polsbyPopper: plan.polsbyPopper,
                        equalPop: equalPop,
                        efficiencyGap: plan.efficiencyGap
                    };
                }
            }
        }
       
        if(enactedSummaryData){
            enactedSummaryRow=<Grid container spacing={2} sx={{margin:"0 auto", paddingTop:'3%'}}>
                                <Grid item xs={2} style={{fontSize:'20pt'}}><div>Enacted</div></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt'}}><div>{enactedSummaryData.numMajMinDistricts}</div></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt'}}><div>{Math.round((enactedSummaryData.equalPop) * 100) / 100+'%'}</div></Grid>
                                <Grid item xs={3} style={{fontSize:'20pt'}}><div>{Math.round((enactedSummaryData.polsbyPopper) * 100) / 100}</div></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt'}}><div>{enactedSummaryData.numDistricts-enactedSummaryData.seatShare + ':' + enactedSummaryData.seatShare}</div></Grid>
                            </Grid>;
        }
        if(proposedSummaryData){
            proposedSummaryRow=<Grid container spacing={2} sx={{margin:"0 auto", paddingTop:'3%'}}>
                                <Grid item xs={2} style={{fontSize:'20pt'}}><div>Proposed</div></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt'}}><div>{proposedSummaryData.numMajMinDistricts}</div></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt'}}><div>{Math.round((proposedSummaryData.equalPop) * 100) / 100+'%'}</div></Grid>
                                <Grid item xs={3} style={{fontSize:'20pt'}}><div>{Math.round((proposedSummaryData.polsbyPopper) * 100) / 100}</div></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt'}}><div>{proposedSummaryData.numDistricts-proposedSummaryData.seatShare + ':' + proposedSummaryData.seatShare}</div></Grid>
                            </Grid>;
        }
        if(oldSummaryData){
            oldSummaryRow=<Grid container spacing={2} sx={{margin:"0 auto", paddingTop:'3%'}}>
                            <Grid item xs={2} style={{fontSize:'20pt'}}><div>Previous (2012-2020)</div></Grid>
                            <Grid item xs={2} style={{fontSize:'20pt'}}><div>{oldSummaryData.numMajMinDistricts}</div></Grid>
                            <Grid item xs={2} style={{fontSize:'20pt'}}><div>{Math.round((oldSummaryData.equalPop) * 100) / 100+'%'}</div></Grid>
                            <Grid item xs={3} style={{fontSize:'20pt'}}><div>{Math.round((oldSummaryData.polsbyPopper) * 100) / 100}</div></Grid>
                            <Grid item xs={2} style={{fontSize:'20pt'}}><div>{oldSummaryData.numDistricts-oldSummaryData.seatShare + ':' + oldSummaryData.seatShare}</div></Grid>
                        </Grid>;
        }
           
    }
    
    let rows= [{ id: 1, planStatus: 'Enacted', numMajMin: 5, equalPop: 5, polsbyPopper: 5, repDemSplit:10 }];
    let columns= [  
                    { field: 'id', headerName: 'Plan ID', width: 100},
                    { field: 'planStatus', headerName: 'Plan Status', width: 150},
                    {field:'numMajMin', headerName:'Majority/Minority\n Districts', width:175},
                    {field: 'equalPop', headerName:'Equal Population Measure', width:175},
                    { field: 'polsbyPopper', headerName: 'Polsby Popper Value', width: 175},
                    { field: 'repDemSplit', headerName: 'Republican/Democrat Split', width: 175}];

       
   return(
    <div class='sidePanel' style={{display: store.isSidePanelVisible ? 'block' : 'none'}}>
        <div style={{height: '1000px', width: '1300px', borderRadius:'4%', resize: 'both', overflow: 'auto'}}>
        <div>
            <Box sx={{height:'35%', width: '100%', bgcolor: '#1C274E'}}>
                <Tabs sx={{paddingTop:'2%',paddingBottom:'2%'}}value={value} onChange={handleChange} centered>
                    <Tab selected className="Tab" onClick={setTab} sx={{color:'white', fontSize:'15pt'}}label="Plan Summary Data" />
                    <Tab selected className="Tab" onClick={setTab} sx={{color:'white', fontSize:'15pt'}}label="Demographics" />
                    <Tab selected className="Tab" onClick={setTab} sx={{color:'white', fontSize:'15pt'}}label="Seat Share" />
                    <Tab selected className="Tab" onClick={setTab} sx={{color:'white', fontSize:'15pt'}}label="Seawulf Data" />
                </Tabs>
            </Box>
            <div style={{fontSize: '25pt', paddingTop:'5%'}}/*onClick={handleMenu}*/>
                Plan Summary Data for {stateName}
            </div>
            <div style={{marginRight:'2%', marginLeft:'2%',marginTop:'4%',paddingBottom:'8%',paddingLeft:'3%',paddingRight:'3%',backgroundColor:'#b6c1e954', borderRadius:'2%'}}>
                <Grid container spacing={2} sx={{margin:"0 auto", paddingTop:'3%'}}>
                    <Grid item xs={2} style={{fontSize:'20pt', fontWeight:'bold'}}><div>Plan status</div></Grid>
                    <Grid item xs={2} style={{fontSize:'20pt', fontWeight:'bold'}}><div>Majority/Minority Districts</div></Grid>
                    <Grid item xs={2} style={{fontSize:'20pt', fontWeight:'bold'}}><div>Equal Population Measure</div></Grid>
                    <Grid item xs={3} style={{fontSize:'20pt', fontWeight:'bold'}}><div>Polsby Popper Value</div></Grid>
                    <Grid item xs={2} style={{fontSize:'20pt', fontWeight:'bold'}}><div>Republican:Democrat Split</div></Grid>
                </Grid>
                    {enactedSummaryRow}
                <Grid>
                    {proposedSummaryRow}
                </Grid>
                <Grid>
                    {oldSummaryRow}
                </Grid>
            </div>
        </div>
    </div>
</div>

    );
}