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

  const handleClose = () => {
    setAnchorEl(null);
    if(store.map){
      console.log("HEY");
    }
  };

  const handleTnClick = () => {
    store.map.flyTo({
      center: [-87.956, 35.761],
      zoom: 5.77
    });
    store.loadSidePanel();
    handleClose();
  };

  const handleMsClick = () => {
    store.map.flyTo({
      center: [-91.665, 32.780],
      zoom: 5.83
    });
    store.loadSidePanel();
    handleClose();
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" backgroundColor='rgb(214,218,254)'>
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1 }}>
          {(
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                Select a state  
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
                <MenuItem onClick={handleTnClick}>Tennesseee</MenuItem>
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