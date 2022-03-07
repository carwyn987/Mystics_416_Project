import graph3 from './demo-data/population-data.png';
import tnTable from './demo-data/tnDistsTable.png';
import msTable from './demo-data/msDistsTable.png';
import tnDemo from './demo-data/tnDemoData.png';
import msDemo from './demo-data/msDemoData.png';

export default function PopulationData(props){
    return(
         <div class="population-data">
            <img src={props.state === 1 ? tnTable : msTable } style={{width:'70%', height:'33%', display: props.visibility2 ? 'block' : 'none', margin:'auto'}}></img>
            <img src={props.state === 1 ? tnDemo : msDemo} style={{width:'80%', height:'33%',display: props.visibility2 ? 'block' : 'none', margin:'auto'}}></img>
        </div>
    );
}