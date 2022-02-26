import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
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
    const [electionDataVisible, setElectionDataVisible] = React.useState(false);
    const [planCompareVisible, setPlanCompareVisible] = React.useState(false);
    const graph = null;
    let isVisible=false;

    const handleClose=()=>{
        store.closeSidePanel();
    }
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
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
   return(
        <div class='sidePanel' style={{display: isVisible ? 'block' : 'none'}}>
            <CloseIcon onClick={handleClose} style={{float:'left', fontSize:'20pt',paddingTop:'2%',paddingLeft:'1%'}}></CloseIcon>
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
        </div>
    );
}