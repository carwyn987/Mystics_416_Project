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
import {useContext} from 'react';

export default function SidePanel(){
    const  { store } = useContext(GlobalStore);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isMinimized, setIsMinimized] = React.useState(false);
    const [isMaximized, setIsMaximized] = React.useState(false);
    const [menuText,setMenuText] = React.useState("NONE SELECTED");
    const [electionDataVisible, setElectionDataVisible] = React.useState(false);
    const [planCompareVisible, setPlanCompareVisible] = React.useState(false);
    const [popDataVisible, setPopDataVisible] = React.useState(false);
    const graph = null;
    let isVisible=false;
    let expandIcon=null;
    let panel=null;
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
    const handleElectionClick=()=>{
        let bool = !electionDataVisible;
        setElectionDataVisible(bool);
        let text;
        if(bool && planCompareVisible && popDataVisible)
            text="ELECTION RESULTS, PLAN COMPARISON & DEMOGRAPHICS";
        else if(bool && planCompareVisible)
            text = "ELECTION RESULTS & PLAN COMPARISON";
        else if(bool && popDataVisible)
            text="ELECTION RESULTS & DEMOGRAPHICS";
        else if(planCompareVisible && popDataVisible)
            text = "PLAN COMPARISON & DEMOGRAPHICS";
        else if(bool)  
            text="ELECTION RESULTS";
        else if(planCompareVisible)
            text="PLAN COMPARISON";
        else if(popDataVisible)
            text="DEMOGRAPHICS";
        else
            text="NONE SELECTED";
        setMenuText(text);
        handleCloseMenu();
    }
    const handleCompareClick=()=>{
        let bool=!planCompareVisible;
        setPlanCompareVisible(bool);
        let text;
        if(bool && electionDataVisible && popDataVisible)
            text="ELECTION RESULTS, PLAN COMPARISON & DEMOGRAPHICS";
        else if(bool && electionDataVisible)
            text="ELECTION RESULTS & PLAN COMPARISON";
        else if(bool && popDataVisible)
            text="PLAN COMPARISON & DEMOGRAPHICS";
        else if(electionDataVisible && popDataVisible)
            text="ELECTION RESULTS & DEMOGRAPHICS";
        else if(bool)  
            text="PLAN COMPARISON";
        else if(electionDataVisible)
            text="ELECTION RESULTS";
        else if(popDataVisible)
            text="DEMOGRAPHICS"
        else
            text="NONE SELECTED";
        setMenuText(text);
        handleCloseMenu();
    }
    const handlePopClick=()=>{
        let bool=!popDataVisible;
        setPopDataVisible(bool);
        let text;
        if(bool && electionDataVisible && planCompareVisible)
            text="ELECTION RESULTS, PLAN COMPARISON & DEMOGRAPHICS";
        else if(bool && planCompareVisible)
            text="PLAN COMPARISON & DEMOGRAPHICS";
        else if(bool && electionDataVisible)
            text="ELECTION RESULTS & DEMOGRAPHICS";
        else if(electionDataVisible && planCompareVisible)
            text="ELECTION RESULTS & PLAN COMPARISON";
        else if(bool)  
            text="DEMOGRAPHICS";
        else if(electionDataVisible)
            text="ELECTION RESULTS";
        else if(planCompareVisible)
            text="PLAN COMPARISON"
        else
            text="NONE SELECTED";
        setMenuText(text);
        handleCloseMenu();
    }
    
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    if(store.isSidePanelVisible){
        isVisible=true;
    }
    else{
        isVisible=false;
    }
    if(!isMaximized)
        expandIcon=<OpenInFullIcon onClick={toggleMaximize}style={{fontSize:'20pt'}}></OpenInFullIcon>;

    let insidePanel=
                <div>
                    <div style={{display:'inline-block',float:'left', fontSize:'20pt',paddingTop:'2%',paddingLeft:'1%'}}>
                        <MinimizeIcon onClick={toggleMinimize} style={{fontSize:'20pt'}}></MinimizeIcon>
                        {expandIcon}
                    </div>         
                    <div onClick={handleMenu}>
                    <Typography style={{fontSize:'x-large',marginTop:'6%',marginRight:'17%',marginBottom:'5%',display:'inline-block'}}>VIEW DATA</Typography>
                        <Button variant="outlined" style={{width:'400px',fontSize:'25pt',borderColor:'white',fontSize:'large',marginRight:'5%',color:'white'}}>
                            {menuText}
                            <ArrowDropDownIcon onClick={handleMenu} style={{display:'inline-block',fontSize:'15pt'}}></ArrowDropDownIcon>
                        </Button>
                    </div>
                    <ElectionData visibility={electionDataVisible}/>
                    <PlanComparison visible={planCompareVisible}/>
                    <PopulationData visibility2={popDataVisible}/>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                        transformOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        >
                        <MenuItem onClick={handleElectionClick}>Election Data</MenuItem>
                        <MenuItem onClick={handleCompareClick}>Compare Plans</MenuItem>
                        <MenuItem onClick={handlePopClick}>Demographics</MenuItem>
                    </Menu>
                </div>;
    
    if(isMaximized){
        panel=
                <div style={{height: '750px', width:'1000px',overflow:'scroll'}}>
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
        panel=<div style={{height: '750px', width: '550px', overflow:'scroll'}}>
                {insidePanel}
            </div>;
    }
    
   return(
        <div class='sidePanel' style={{display: isVisible ? 'block' : 'none'}}>
                {panel}
        </div>
    );
}