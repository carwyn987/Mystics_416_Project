import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useContext } from 'react';
import { GlobalStore } from './DataStore.js';
import { setRef } from '@mui/material';

export default function AppToolbar() {
  const { store } = useContext(GlobalStore);
  const [anchorEl, setAnchorEl] = React.useState(null);
  //let zoomTN = false;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSidePanelClick = (event) =>{

  };
  const setDStoreState = (state) => {
    store.setCountyState(state);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTnClick = () => {
    store.map.flyTo({
      center: [-88.956, 35.761],
      zoom: 5.77
    });
    //store.setCurrentState("TN");
    //store.zoomTN();
    //setDStoreState(1);
    //store.zoomTN();
    store.loadSidePanel();
    //store.setStateFocus("TN");
    handleClose();
  };

  const handleMsClick = () => {
    store.map.flyTo({
      center: [-91.665, 32.780],
      zoom: 5.83
    });
    //store.setCurrentState("MS");
    //store.zoomMS();
    //setDStoreState("MS");
    //store.zoomMS();
    //setDStoreState(2);
    store.loadSidePanel();
    //store.setStateFocus("MS");
    handleClose();
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" backgroundColor='rgb(214,218,254)'>
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1 }}>
          {(
            
            <div>
              <Typography style={{float:'left', top:'28%',fontSize:'13pt',position:'absolute', /*border:'medium solid white*/}}>Redistricting Assessor</Typography>
              <IconButton
              style={{margin:'auto%'}}
                size="xx-large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                Choose A State  
                <ArrowDropDownIcon></ArrowDropDownIcon>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                transformOrigin={{vertical: 'top', horizontal: 'center'}}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleTnClick}>Tennessee</MenuItem>
                <MenuItem onClick={handleMsClick}>Mississippi</MenuItem>
              </Menu>
            </div>
          )}
          </Box>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}