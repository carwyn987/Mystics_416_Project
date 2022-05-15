import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { GlobalStore } from './DataStore'
import Typography from '@mui/material/Typography';
import {useContext, useEffect} from 'react';


export default function CenteredTabs() {
const {store} = React.useContext(GlobalStore);
  const [value, setValue] = React.useState(0);
  let stateName;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if(store.currentState == "TN"){
    stateName = "Tennessee";
  }
  else if(store.currentState == "MS"){
      stateName = "Mississippi";
  }
  else if(store.currentState == "NC"){
      stateName = "North Carolina";
  }
  //      /Typography style={{paddingTop:'3%',fontSize:'x-large'}}>for {stateName}</Typography>

  return (
    <Box sx={{height:'35%', width: '100%', bgcolor: '#1C274E'}}>
      <Tabs sx={{paddingTop:'2%',paddingBottom:'2%'}}value={value} onChange={handleChange} centered>
        <Tab selected className="Tab" sx={{color:'white', fontSize:'12pt'}}label="Plan Summary Data" />
        <Tab selected className="Tab" sx={{color:'white', fontSize:'12pt'}}label="Demographics" />
        <Tab selected className="Tab" sx={{color:'white', fontSize:'12pt'}}label="Seat Share" />
        <Tab selected className="Tab" sx={{color:'white', fontSize:'12pt'}}label="Seawulf Data" />
      </Tabs>
    </Box>
  );
}
