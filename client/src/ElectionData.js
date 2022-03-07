import graph1 from './demo-data/dem-votes-graph.png';
import { GlobalStore } from './DataStore.js';
import * as React from 'react';
import {useContext} from 'react'
export default function ElectionData(props){
    const { store } = useContext(GlobalStore);
    if(store.currentState)
        console.log("CURRENT STATE (ELECTION DATA): "+store.currentState);
    return (
    <div class='election-data'>
        <img src={graph1} style={{width:'80%', height:'33%',display: props.visibility ? 'block' : 'none', margin:'auto'}}></img>
    </div>
    );
}