import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { GlobalStore } from './dataStore'
import graph1 from './demo-data/dem-votes-graph.png';
import graph2 from './demo-data/plan-comparison.png';
import * as React from 'react';
import {useContext} from 'react';

export default function SidePanel(){
    const  { store } = useContext(GlobalStore);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [voteGraphVisible, setVoteGraphVisible] = React.useState(false);
    const [compareGraphVisible, setCompareGraphVisible] = React.useState(false);
    const graph = null;
    let isVisible=false;

    const handleClose=()=>{
        store.closeSidePanel();
    }
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleVoteClick=()=>{
        let bool = !voteGraphVisible;
        setVoteGraphVisible(bool);
        handleCloseMenu();
    }
    const handleCompareClick=()=>{
        let bool=!compareGraphVisible;
        setCompareGraphVisible(bool);
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
                <Button variant="outlined" style={{outlineColor:'white',fontSize:'large',marginTop:'2%',color:'white',justifyContent:'center',paddingRight:'4%'}}>
                    Select the data to view<ArrowDropDownIcon onClick={handleMenu} style={{display:'inline-block',fontSize:'15pt'}}></ArrowDropDownIcon>
                </Button>
            </div>
            <img src={graph1} width={500} height={300} style={{visibility: voteGraphVisible ? 'visible' : 'hidden'}}></img>
            <img src={graph2} width={500} height={300} style={{visibility: compareGraphVisible ? 'visible' : 'hidden'}}></img>
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
                <MenuItem onClick={handleVoteClick}>Election Data</MenuItem>
                <MenuItem onClick={handleCompareClick}>Compare Plans</MenuItem>
              </Menu>
        </div>
    );
}