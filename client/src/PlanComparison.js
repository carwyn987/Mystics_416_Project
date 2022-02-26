import graph2 from './demo-data/plan-comparison.png';
import tnSplit from './demo-data/tnSplitCounties.png';
import msSplit from './demo-data/msSplitCounties.png'
export default function PlanComparison(props){
    return(
        <div class="plan-comparison">
            <img src={props.state === 1 ? tnSplit : msSplit} style={{width:'70%', height:'33%',display: props.visible ? 'block' : 'none', margin:'auto'}}></img>
            <div style={{padding: '10px', display: props.visible ? 'block' : 'none'}}>Total Number of Split Counties: {props.state === 1 ? "9" : "4"}</div>
            <img src={graph2} style={{width:'80%', height:'33%',display: props.visible ? 'block' : 'none', margin:'auto'}}></img>
        </div>
    );
}