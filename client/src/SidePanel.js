import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import MinimizeIcon from '@mui/icons-material/Minimize';import Box from '@mui/material/Box';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Draggable from 'react-draggable';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { GlobalStore } from './DataStore'
import ElectionData from './ElectionData';
import PlanComparison from './PlanComparison';
import * as React from 'react';
import {useContext} from 'react';

export default function SidePanel(){
    const  { store } = useContext(GlobalStore);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isMinimized, setIsMinimized] = React.useState(null);
    const [electionDataVisible, setElectionDataVisible] = React.useState(false);
    const [planCompareVisible, setPlanCompareVisible] = React.useState(false);
    const graph = null;
    let isVisible=false;
    let panel=null;
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const toggleMinimize=()=>{
        let bool = !isMinimized;
        setIsMinimized(bool);
    }
    const handleElectionClick=()=>{
        let bool = !electionDataVisible;
        setElectionDataVisible(bool);
        handleCloseMenu();
    }
    const handleCompareClick=()=>{
        let bool=!planCompareVisible;
        setPlanCompareVisible(bool);
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
    if(!isMinimized){
        panel=<div style={{height: '750px', width: '550px'}}>
                <MinimizeIcon onClick={toggleMinimize} style={{float:'left', fontSize:'20pt',paddingTop:'2%',paddingLeft:'1%'}}></MinimizeIcon>
                <div onClick={handleMenu}>
                    <Button variant="outlined" style={{fontSize:'45pt',outlineColor:'white',fontSize:'large',marginTop:'2%',color:'white',justifyContent:'center',paddingRight:'4%'}}>
                        VIEW DATA<ArrowDropDownIcon onClick={handleMenu} style={{display:'inline-block',fontSize:'15pt'}}></ArrowDropDownIcon>
                    </Button>
                </div>
                <ElectionData visibility={electionDataVisible}/>
            <PlanComparison visible={planCompareVisible}/>
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
              </Menu>
            </div>;
    }
    else{
        panel=
                <div style={{width: '100px',height:'1%', top:'1%'}}>
                    <OpenInFullIcon onClick={toggleMinimize} style={{display: 'inline-block',borderRadius:'15px', top: '-10%'}}></OpenInFullIcon>
                    <Box>
                            View Data
                    </Box>
                </div>;
    }
   return(
        <div class='sidePanel' style={{display: isVisible ? 'block' : 'none'}}>
                {panel}
        </div>
    );
}