import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import { GlobalStore } from './dataStore'
import graph1 from './demo-data/dem-votes-graph.png'
import { createContext, useContext, useState } from 'react'

export default function SidePanel(){
    const  { store } = useContext(GlobalStore);
    let isVisible=false;
    const handleClose=()=>{
        store.closeSidePanel();
    }
    if(store.isSidePanelVisible){
        isVisible=true;
    }
    else{
        isVisible=false;
    }
   return(
        <div class='sidePanel' style={{visibility: isVisible ? 'visible' : 'hidden'}}>
            <CloseIcon onClick={handleClose} style={{float:'left', fontSize:'20pt',paddingTop:'2%',paddingLeft:'1%'}}></CloseIcon>
            <Typography style={{fontSize:'x-large',marginTop:'2%',justifyContent:'center',paddingRight:'4%'}}>
                Select the data to view<ArrowDropDownIcon style={{fontSize:'large'}}></ArrowDropDownIcon>
            </Typography>
            <img src={graph1} width={500} height={300}></img>
        </div>
    );
}