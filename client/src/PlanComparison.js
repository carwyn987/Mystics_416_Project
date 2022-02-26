import graph2 from './demo-data/plan-comparison.png';
export default function PlanComparison(props){
    return(
        <div class="plan-comparison">
            <img src={graph2} style={{width:'80%', height:'33%',display: props.visible ? 'block' : 'none', margin:'auto'}}></img>
        </div>
    );
}