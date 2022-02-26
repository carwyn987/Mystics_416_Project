import graph1 from './demo-data/dem-votes-graph.png';

export default function ElectionData(props){
    console.log("props.display = " + props.display);
    return (
    <div class='election-data'>
        <img src={graph1} width={500} height={300} style={{display: props.visibility ? 'block' : 'none', margin:'auto'}}></img>
    </div>
    );
}