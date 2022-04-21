export default function API(){
    //        fetch("http://localhost:8080/getDistrict?id=45").then(response=>response.json()).then((res)=>console.log(res));/*setVotes(res.demVotes,res.repVotes)*/        

    const getState=(stateID)=>{
        fetch(`http://localhost:8080/electiondata?stateID=${stateID}`)
    }
}