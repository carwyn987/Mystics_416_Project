import graph2 from './demo-data/plan-comparison.png';
export default function PlanComparison(props){
    return(
        <div class="plan-comparison">
            <img src={graph2} width={500} height={300} style={{visibility: props.visible ? 'visible' : 'hidden'}}></img>
        </div>
    );
}