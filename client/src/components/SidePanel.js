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
import SeawulfData from './SeawulfData';
import { DataGrid } from '@mui/x-data-grid';
import 'animate.css';
import PopulationGraph from './PopulationGraph.js';
import SeatShareGraph from './SeatShareGraph.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    const [mainSummaryVisible, setMainSummaryVisible] = React.useState(true);
    const [summaryTabVisible, setSummaryTabVisible] = React.useState(true);
    const[demographicsTabVisible, setDemographicsTabVisible] = React.useState(false);
    const [seatShareTabVisible, setSeatShareTabVisible] = React.useState(false);
    const [seawulfTabVisible, setSeawulfTabVisible] = React.useState(false);
    const [enactedPlanSummaryView, setEnactedPlanSummaryView] = React.useState(false);
    const [proposedPlanSummaryView, setProposedPlanSummaryView] = React.useState(false);
    const [oldPlanSummaryView, setOldPlanSummaryView] = React.useState(false);
    const [seawulfDemVisible, setSeawulfDemVisible] = React.useState(false);
    const [seawulfRepVisible, setSeawulfRepVisible] = React.useState(false);
    const [seawulfBlackVisible, setSeawulfBlackVisible] = React.useState(false);
    const [seawulfAsianVisible, setSeawulfAsianVisible] = React.useState(false);
    const [seawulfNativeVisible, setSeawulfNativeVisible] = React.useState(false);
    const [bwTitle, setbwTitle] = React.useState("");
    const [menuChoice, setMenuChoice] = React.useState("");
    const [numDistricts, setNumDistricts] = React.useState(0);
    const [numMajMinDist, setNumMajMinDist] = React.useState(0);
    const [effGap, setEffGap] = React.useState(0);
    const [currentPlan, setCurrentPlan] = React.useState("");
    const [rdSplit, setRDSplit] = React.useState("");

    let statePopulation;
    //const [stateName, setStateName] = React.useState(null);
    const [value, setValue] = React.useState(0);
    // const[enactedPlanSummaryData, setEnactedPlanSummaryData] = React.useState(null);
    const graph = null;
    // election from which voting preference is used, number of majority-minority districts, and efficiency gap
    let  menuItems,enactedPlanSummaryData, stateName,proposedPlanData, oldPlanData, sidePanelVisible = false, expandIcon = null, panel = null, demVotes = 0, 
    repubVotes = 0, state, enactedSummaryRow, proposedSummaryRow, oldSummaryRow;
    const TN=1;
    const MS=2;
    const NC=3;

    const getDemographics = async function (planType){
        const response = await fetch(`http://localhost:8080/getDemographics?stateID=${store.stateObj.id}&planType=${planType}`);
        const json = await response.json();
        state = json;
        console.log(state);
        let i = 0;
        switch(planType){
            case 'enacted':
                i = 0;
                for(i=0; i < store.stateObj.districtPlans.length; i++){
                    let plan = store.stateObj.districtPlans[i];
                    if(plan.status.includes('enacted')){
                        setNumDistricts(plan.numDistricts);
                        setNumMajMinDist(plan.numMajMinDistricts);
                        setEffGap(plan.efficiencyGap);
                        setCurrentPlan(plan.status);
                        let r = plan.numDistricts-plan.seatShare;
                        let d = plan.seatShare;
                        setRDSplit(parseInt(r)+':'+parseInt(d));
                    }
                }
                setEnactedPlanSummaryView(true);
                setMainSummaryVisible(false);
                break;
            case 'proposed':
                i = 0;
                for(i=0; i < store.stateObj.districtPlans.length; i++){
                    let plan = store.stateObj.districtPlans[i];
                    if(plan.status.includes('proposed')){
                        setNumDistricts(plan.numDistricts);
                        setNumMajMinDist(plan.numMajMinDistricts);
                        setEffGap(plan.efficiencyGap);
                        setCurrentPlan(plan.status);
                    }
                }
                setProposedPlanSummaryView(true);
                setMainSummaryVisible(false);
                break;
            case 'old':
                i = 0;
                for(i=0; i < store.stateObj.districtPlans.length; i++){
                    let plan = store.stateObj.districtPlans[i];
                    if(plan.status.includes('old')){
                        setNumDistricts(plan.numDistricts);
                        setNumMajMinDist(plan.numMajMinDistricts);
                        setEffGap(plan.efficiencyGap);
                        setCurrentPlan(plan.status);                   
                    }
                }
                setOldPlanSummaryView(true);
                setMainSummaryVisible(false);
                break;
            default:
                break;
        }
        // const response = await fetch(`http://localhost:8080/getState?stateID=${stateId}`);
        // const json = await response.json();
        // state = json;
        // console.log(state);
    }
    const handleBWMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const setTab=(event)=>{
        let tab = String(event.target.innerHTML);
        if(tab.includes("Summary")){
            setSummaryTabVisible(true);
            setDemographicsTabVisible(false);
            setSeatShareTabVisible(false);
            setSeawulfTabVisible(false);
        }
        else if(tab.includes("Demographics")){
            setSummaryTabVisible(false);
            setDemographicsTabVisible(true);
            setSeatShareTabVisible(false);
            setSeawulfTabVisible(false);
        }
        else if(tab.includes("Seat")){
            setSummaryTabVisible(false);
            setDemographicsTabVisible(false);
            setSeatShareTabVisible(true);
            setSeawulfTabVisible(false);
        }
        else if(tab.includes("Seawulf")){
            setSummaryTabVisible(false);
            setDemographicsTabVisible(false);
            setSeatShareTabVisible(false);
            setSeawulfTabVisible(true);
        }
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
   
    if(store.currentState === "TN"){
        sidePanelVisible = true;
       // stateName="Tennessee";
        // setStateName("Tennessee");
        // getStateData(TN);
    }
    else if(store.currentState === "MS"){
        sidePanelVisible=true;
       // stateName="Mississippi";
        // setStateName("Mississippi");
        // getStateData(MS);
    }
    else if(store.currentState === "NC"){
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
                //Number of districts - seatShare
                if(plan.status==="enacted"){
                    let equalPopM = Math.trunc((Math.round((plan.equalPopMeasure) * 100) / 100)*100);
                    enactedSummaryData={
                        planId: plan.planId,
                        numDistricts: plan.numDistricts,
                        seatShare: plan.seatShare,
                        numMajMinDistricts: plan.numMajMinDistricts,
                        polsbyPopper: plan.polsbyPopper,
                        equalPop: equalPopM,
                        efficiencyGap: plan.efficiencyGap
                    };
                    let math = (Math.round((enactedSummaryData.equalPop) * 100) / 100);
                    console.log(math);
                }
                else if(plan.status==="proposed"){
                    let equalPopM = Math.trunc((Math.round((plan.equalPopMeasure) * 100) / 100)*100);
                    proposedSummaryData={
                        planId: plan.planId,
                        numDistricts: plan.numDistricts,
                        seatShare: plan.seatShare,
                        numMajMinDistricts: plan.numMajMinDistricts,
                        polsbyPopper: plan.polsbyPopper,
                        equalPop: equalPopM,
                        efficiencyGap: plan.efficiencyGap
                    };
                }
                else if(plan.status==="old"){
                    let equalPopM = Math.trunc((Math.round((plan.equalPopMeasure) * 100) / 100)*100);
                    oldSummaryData={
                        planId: plan.planId,
                        numDistricts: plan.numDistricts,
                        seatShare: plan.seatShare,
                        numMajMinDistricts: plan.numMajMinDistricts,
                        polsbyPopper: plan.polsbyPopper,
                        equalPop: equalPopM,
                        efficiencyGap: plan.efficiencyGap
                    };
                }
            }
        }
        if(enactedSummaryData){
            enactedSummaryRow=<Grid container spacing={2} sx={{margin:"0 auto", paddingTop:'3%'}}>
                                <Grid item xs={2} style={{fontSize:'20pt'}}><Button onClick={()=>getDemographics('enacted')} sx={{bgcolor: '#1C274E', fontSize:'20pt'}}variant="contained">Enacted</Button></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt'}}><div>{enactedSummaryData.numMajMinDistricts}</div></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt'}}><div>{enactedSummaryData.equalPop+'%'}</div></Grid>
                                <Grid item xs={3} style={{fontSize:'20pt'}}><div>{Math.round((enactedSummaryData.polsbyPopper) * 100) / 100}</div></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt'}}><div>{enactedSummaryData.numDistricts-enactedSummaryData.seatShare + 'R/' +enactedSummaryData.seatShare + 'D'}</div></Grid>
                            </Grid>;
        }
        if(proposedSummaryData){
            proposedSummaryRow=<Grid container spacing={2} sx={{margin:"0 auto", paddingTop:'3%'}}>
                                <Grid item xs={2} style={{fontSize:'20pt',textAlign:'center'}}><Button onClick={()=>getDemographics('proposed')} sx={{bgcolor: '#1C274E', fontSize:'20pt'}}variant="contained">Proposed</Button></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt',textAlign:'center'}}><div>{proposedSummaryData.numMajMinDistricts}</div></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt',textAlign:'center'}}><div>{proposedSummaryData.equalPop+'%'}</div></Grid>
                                <Grid item xs={3} style={{fontSize:'20pt',textAlign:'center'}}><div>{Math.round((proposedSummaryData.polsbyPopper) * 100) / 100}</div></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt',textAlign:'center'}}><div>{proposedSummaryData.numDistricts-proposedSummaryData.seatShare + 'R/' + proposedSummaryData.seatShare +'D'}</div></Grid>
                            </Grid>;
        }
        if(oldSummaryData){
            oldSummaryRow=<Grid container spacing={2} sx={{margin:"0 auto", paddingTop:'3%'}}>
                            <Grid item xs={2} style={{fontSize:'20pt'}}><Button onClick={()=>getDemographics('old')} sx={{bgcolor: '#1C274E', fontSize:'20pt'}}variant="contained">Previous (2012-2020)</Button></Grid>
                            <Grid item xs={2} style={{fontSize:'20pt'}}><div>{oldSummaryData.numMajMinDistricts}</div></Grid>
                            <Grid item xs={2} style={{fontSize:'20pt'}}><div>{oldSummaryData.equalPop+'%'}</div></Grid>
                            <Grid item xs={3} style={{fontSize:'20pt'}}><div>{Math.round((oldSummaryData.polsbyPopper) * 100) / 100}</div></Grid>
                            <Grid item xs={2} style={{fontSize:'20pt'}}><div>{oldSummaryData.numDistricts-oldSummaryData.seatShare + 'R/' + oldSummaryData.seatShare + 'D'}</div></Grid>
                        </Grid>;
        }
    }
    if(store.stateObj){
        statePopulation = store.stateObj.population.toLocaleString();
    }
    let mainSummaryTab = <div>
                        <div style={{fontSize: '25pt', paddingTop:'5%'}}/*onClick={handleMenu}*/>
                            Plan Summary Data for {stateName}<br></br>
                        </div>
                        <div style={{marginRight:'2%', marginLeft:'2%',marginTop:'4%',paddingBottom:'8%',paddingLeft:'3%',paddingRight:'3%',backgroundColor:'#b6c1e954', borderRadius:'2%'}}>
                            <Grid container spacing={2} sx={{margin:"0 auto", paddingTop:'3%'}}>
                                <Grid item xs={2} style={{fontSize:'20pt', fontWeight:'bold'}}><div>Plan status<div style={{fontSize:'14pt'}}><br></br>(Click on a plan to view more details)</div></div></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt', fontWeight:'bold'}}><div>Majority/Minority Districts</div></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt', fontWeight:'bold'}}><div>Equal Population Measure</div></Grid>
                                <Grid item xs={3} style={{fontSize:'20pt', fontWeight:'bold'}}><div>Polsby Popper Value</div></Grid>
                                <Grid item xs={2} style={{fontSize:'20pt', fontWeight:'bold'}}><div>Republican/Democrat Split</div></Grid>
                            </Grid>
                                {enactedSummaryRow}
                            <Grid>
                                {proposedSummaryRow}
                            </Grid>
                            <Grid>
                                {oldSummaryRow}
                            </Grid>
                        </div>
                    </div>;
        const backToMain=()=>{
            let bool = true;
            setMainSummaryVisible(bool);
            setEnactedPlanSummaryView(false);
            setProposedPlanSummaryView(false);
            setOldPlanSummaryView(false);
        }
        const handleSeawulfDem=()=>{
            setSeawulfDemVisible(true);
            setSeawulfRepVisible(false);
            setSeawulfBlackVisible(false);
            setSeawulfAsianVisible(false);
            setSeawulfNativeVisible(false);
            setbwTitle("Democrat");
        }
        const handleSeawulfRep=()=>{
            setSeawulfRepVisible(true);
            setSeawulfDemVisible(false);
            setSeawulfBlackVisible(false);
            setSeawulfAsianVisible(false);
            setSeawulfNativeVisible(false);
            setbwTitle("Republican");
        }
        const handleSeawulfBlack=()=>{
            setSeawulfBlackVisible(true);
            setSeawulfDemVisible(false);
            setSeawulfRepVisible(false);
            setSeawulfAsianVisible(false);
            setSeawulfNativeVisible(false);
            setbwTitle("Black");
        }
        const handleSeawulfNative=()=>{
            setSeawulfNativeVisible(true);
            setSeawulfDemVisible(false);
            setSeawulfRepVisible(false);
            setSeawulfAsianVisible(false);
            setSeawulfBlackVisible(false);
            setbwTitle("Native");
        }
        const handleSeawulfAsian=()=>{
            setSeawulfAsianVisible(true);
            setSeawulfBlackVisible(false);
            setSeawulfDemVisible(false);
            setSeawulfRepVisible(false);
            setSeawulfNativeVisible(false);
            setbwTitle("Asian");
        }
        //When the user clicks on a districting shown in the summary, details about the selected districting will be displayed. 
        //Details include number of districts, summary of each district in the districting, including population, population by demographic group, 
        //Republican/Democratic split, election from which voting preference is used, number of majority-minority districts, and efficiency gap.

        let planSummary = <div> 
                                    <div style={{fontSize: '25pt', marginTop:'3%', fontWeight:'bold'}}>Enacted Plan Summary for {stateName}</div>
                                    <Grid container spacing={2} sx={{margin:"0 auto", paddingTop:'3%'}}>
                                    </Grid>
                                    <Grid item xs={2} style={{fontSize:'20pt'}}><div>Number of districts:  {numDistricts}</div></Grid>
                                    <br></br>
                                    <Grid item xs={2} style={{fontSize:'20pt'}}><div>Majority/Minority Districts:  {numMajMinDist}</div></Grid>
                                    <br></br>
                                    <Grid item xs={2} style={{fontSize:'20pt'}}><div>Efficiency Gap:  {effGap}</div></Grid>
                                    <br></br>
                                    <Grid item xs={2} style={{fontSize:'20pt'}}><div>Republican/Democrat Split:  {rdSplit}</div></Grid>
                                    <br></br>
                                    <Button onClick={backToMain} sx={{bgcolor:'#b6c1e954', fontSize:'20pt'}}variant="contained">Click to go back to summary</Button>
                                </div>;
        let proposedPlanSummary = <div> 
                                    <div style={{fontSize: '25pt'}}>Proposed Plan Summary for {stateName}</div>
                                    <Button onClick={backToMain} sx={{bgcolor:'#b6c1e954', fontSize:'20pt'}}variant="contained">Click to go back to summary</Button>
                                </div>;
        
        let oldPlanSummary =<div> 
                                <div style={{fontSize: '25pt'}}>Previous Plan Summary (2012-2020) for {stateName}</div>
                                <Button onClick={backToMain} sx={{bgcolor:'#b6c1e954', fontSize:'20pt'}}variant="contained">Click to go back to summary</Button>
                            </div>;

        let summaryTab=<div>
                            <div style={{display: mainSummaryVisible ? 'block' : 'none'}}>{mainSummaryTab}</div>
                            <div style={{display: enactedPlanSummaryView ? 'block' : 'none'}}>{planSummary}</div>
                            <div style={{display: proposedPlanSummaryView ? 'block' : 'none'}}>{planSummary}</div>
                            <div style={{display: oldPlanSummaryView ? 'block' : 'none'}}>{planSummary}</div>
                        </div>;
    let demographicsTab = <div style={{fontSize: '25pt', paddingTop:'5%'}}>
                            Demographic Data for {stateName}
                            <div style={{marginTop:'3%'}}>Total Population: {statePopulation}</div>
                            <PopulationGraph plan={currentPlan}/>
                        </div>;
    let seatShareTab = <div style={{fontSize: '25pt', paddingTop:'5%'}}>Seat Share Plot for {stateName}
                            <SeatShareGraph plan={currentPlan}/>
                        </div>;
    let seawulfTab = <div style={{fontSize: '25pt', paddingTop:'5%'}}>Seawulf Summary data for {stateName}
                        <div style={{fontSize:'18pt', marginTop:'6%'}}>Choose a group for the box and whisker charts <ArrowDropDownIcon onClick={handleBWMenu}></ArrowDropDownIcon></div>
                        <div style={{fontSize:'15pt'}}>Currently Viewing: {bwTitle}</div>

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
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleSeawulfDem}>Democrat</MenuItem>
                            <MenuItem onClick={handleSeawulfRep}>Republican</MenuItem>
                            <MenuItem onClick={handleSeawulfBlack}>Black</MenuItem>
                            <MenuItem onClick={handleSeawulfNative}>Native</MenuItem>
                            <MenuItem onClick={handleSeawulfAsian}>Asian</MenuItem>
                        </Menu>
                        <SeawulfData dem={seawulfDemVisible} rep={seawulfRepVisible} black={seawulfBlackVisible} asian={seawulfAsianVisible} native={seawulfNativeVisible}></SeawulfData>
                    </div>;
    
   return(
    <div className='sidePanel' style={{display: store.isSidePanelVisible ? 'block' : 'none'}}>
        <div style={{height: '1000px', width: '1300px', borderRadius:'8px', resize: 'both', overflow: 'auto'}}>
        <div>
            <Box sx={{height:'35%', width: '100%', bgcolor: '#1C274E'}}>
                <Tabs sx={{paddingTop:'2%',paddingBottom:'2%'}} value={value} onChange={handleChange} centered>
                    <Tab selected className="Tab" onClick={setTab} sx={{color:'white', fontSize:'15pt',textAlign:'center'}}label="Plan Summary Data" />
                    <Tab selected className="Tab" onClick={setTab} sx={{color:'white', fontSize:'15pt',textAlign:'center'}}label="Demographics" />
                    <Tab selected className="Tab" onClick={setTab} sx={{color:'white', fontSize:'15pt',textAlign:'center'}}label="Seat Share" />
                    <Tab selected className="Tab" onClick={setTab} sx={{color:'white', fontSize:'15pt',textAlign:'center'}}label="Seawulf Data" />
                </Tabs>
            </Box>
            <div style={{display: summaryTabVisible ? 'block' : 'none'}}>{summaryTab}</div>
            <div style={{display: demographicsTabVisible ? 'block' : 'none'}}>{demographicsTab}</div>
            <div style={{display: seatShareTabVisible ? 'block' : 'none'}}>{seatShareTab}</div>
            <div style={{display: seawulfTabVisible ? 'block' : 'none'}}>{seawulfTab}</div>
        </div>
    </div>
</div>

    );
}