
export function getState(stateID){
    let response;
    return fetch(`http://localhost:8080/getState?stateID=${stateID}`).then(response => response.json()).then(response=>{return response.data.population});
}
export function sendData(response){
    console.log("RESP: "+response);
    return response;
}


