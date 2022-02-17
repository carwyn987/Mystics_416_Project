import ToggleButtonsMultiple from './ToggleButtonsMultiple.js'
import Typography from '@mui/material/Typography';

export default function MapToggles(){
    return(
        <div class='mapToggles'>
            <Typography style={{fontSize:'x-large'}}> Choose a Boundary Definition<br></br></Typography>
            <div>
                <br></br>
                <div style={{fontSize:'20pt'}}>Congressional Districts</div>
                <div style={{fontSize:'20pt'}}>Counties</div>
                <div style={{fontSize:'20pt'}}>Precincts</div>
            </div>
        </div>
    )
}