import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GlobalStore from './dataStore'
import { createContext, useContext, useState } from 'react'

export default function SidePanel(){
    const  [ store ] = useContext(GlobalStore);
    let isVisible=false;
    if(store.isSidePanelVisible){
        isVisible=true;
    }
   return(
        <div class='sidePanel' isVisible={isVisible}>
            <Typography style={{fontSize:'x-large',marginTop:'2%'}}>
                Select the data to view<ArrowDropDownIcon style={{fontSize:'large'}}></ArrowDropDownIcon>
            </Typography>
        </div>
    );
}