import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function SidePanel(){
    return(
        <div class='sidePanel'>
            <Typography style={{fontSize:'x-large',marginTop:'2%'}}>
                Select the data to view<ArrowDropDownIcon style={{fontSize:'large'}}></ArrowDropDownIcon>
            </Typography>
        </div>
    )
}