import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function SidePanel(){
    return(
        <div class='sidePanel'>
            <Typography>
                Select the data to view<ArrowDropDownIcon style={{size:'small'}}></ArrowDropDownIcon>
            </Typography>
        </div>
    )
}