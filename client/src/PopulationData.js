import graph3 from './demo-data/population-data.png';
export default function PopulationData(props){
    return(
         <div class="population-data">
            <img src={graph3} width={500} height={300} style={{display: props.visibility2 ? 'block' : 'none'}}></img>
        </div>
    );
}