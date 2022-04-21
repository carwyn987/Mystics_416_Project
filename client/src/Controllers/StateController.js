
    const getState=(stateID)=>{
        fetch(`http://localhost:8080/electiondata?stateID=${stateID}`)
    }
