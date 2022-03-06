import graph1 from './demo-data/dem-votes-graph.png';

export default function ElectionData(props){
    return (
    <div class='election-data'>
        <img src={graph1} style={{width:'80%', height:'33%',display: props.visibility ? 'block' : 'none', margin:'auto'}}></img>
    </div>
    );
}