import graph3 from './demo-data/population-data.png';
export default function PopulationData(props){
    return(
         <div class="population-data">
            <img src={graph3} style={{width:'80%', height:'33%',display: props.visibility2 ? 'block' : 'none', margin:'auto'}}></img>
        </div>
    );
}