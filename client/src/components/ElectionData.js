import graph1 from '../demo-data/dem-votes-graph.png';
import { GlobalStore } from './DataStore.js';
import * as React from 'react';
import {useContext, useEffect} from 'react';

export default function ElectionData(props){
    const { store } = useContext(GlobalStore);
    const[demVotes, setDemVotes]=React.useState(0); 
    const[repubVotes, setRepubVotes]=React.useState(0);
    let backendRequested=false;
    useEffect(()=>{
        if(store.currentState && !backendRequested){
          //  getElectionData(store.currentState,store.currentDistrict);
            backendRequested=true;
        }
    })

    async function getElectionData(state,district){
        fetch("http://localhost:8080/getDistrict?id=45").then(response=>response.json()).then((res)=>console.log(res));      
    }
  
    const setVotes=(dem,rep)=>{
        if(dem&rep){
            setDemVotes(dem);
            setRepubVotes(rep);
        }
    }

    return (
    <div class='election-data' style={{display: props.visibility ? 'block' : 'none'}}>
        <div style={{fontSize:'30pt'}}>Democratic Votes: {demVotes}<br></br>Republican Votes: {repubVotes}</div>
        <img src={graph1} style={{width:'80%', height:'33%', margin:'auto'}}></img>
    </div>
    );
}