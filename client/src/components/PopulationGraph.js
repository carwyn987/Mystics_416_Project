import * as React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { GlobalStore } from './DataStore';
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';
import '../App.css';

export function PopulationGraph(props) {
    let { store } = useContext(GlobalStore);
    let graph;
    // const oldData = props.oldData;
    // const enactedData = props.enactedData;
    // const proposedData = props.proposedData;
    var proposedGraphData, proposedGraph;
    const tnCategories = ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9"];
    const oldNcCategories = ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9", "District 10", "District 11", "District 12", "District 13"];
    const msCategories = ["District 1", "District 2", "District 3", "District 4"];
    const ncCategories = ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9", "District 10", "District 11", "District 12", "District 13", "District 14"];
    // const [oldData, setOldDemographics] = React.useState(null);
    // const [enactedData, setEnactedDemographics] = React.useState(null);
    // const [proposedData, setProposedDemographics] = React.useState(null);
    const [enactedSet, setEnacted] = React.useState(false);
    const [oldSet, setOld] = React.useState(false);
    const [proposedSet, setProposed] = React.useState(false);
    let stateId=null, oldData, enactedData, proposedData;

    const tnEnacted = {
      0: [682393, 16625, 2727, 6370],
      1: [656012, 45476, 3083, 14104],
      2: [604214, 77059, 3240, 11743],
      3: [604198, 81263, 3866, 15600],
      4: [524790, 83370, 2997, 31415],
      5: [603816, 72064, 3783, 9110],
      6: [542450, 119036, 3173, 15390],
      7: [564649, 140591, 2151, 16464],
      8: [208416, 457464, 3024, 15419],
      size: 9
    };
    const tnOld = {
      0: [644108, 15932, 2584, 6142],
      1: [662991, 46018, 3146, 14268],
      2: [588452, 72510, 3001, 10773],
      3: [631454, 87566, 4110, 15748],
      4: [455837, 168041, 4115, 27868],
      5: [687097, 39922, 3360, 9583],
      6: [657943, 85357, 2991, 20180],
      7: [499827, 134145, 1928, 17377],
      8: [163229, 443457, 2809, 13676],
      size: 9
    };
    const msEnacted = {
      0: [567766, 186155, 8488, 9219],
      1: [273647, 356742, 1321, 6828],
      2: [283488, 365703, 3071, 4517],
      3: [529635, 169238, 3559, 12124],
      size: 4
    };
    const msOld = {
      0: [499076, 231909, 2047, 7353],
      1: [432452, 250032, 8259, 9078],
      2: [205593, 414847, 2540, 3822],
      3: [17415, 181050, 3593, 12435],
      size: 4
    };
    const msProposed = {
      0: [489884, 223230, 1870, 7314],
      1: [234910, 449540, 2683, 4122],
      2: [435430, 235747, 8587, 8944],
      3: [494312, 169321, 3299, 12308],
      size: 4
    };
    const ncEnacted = {
      0: [624673, 254114, 7550, 30110],
      1: [369238, 89530, 11131, 22230],
      2: [466916, 132895, 5277, 13130],
      3: [382709, 157695, 4282, 29034],
      4: [654334, 134760, 5131, 33386],
      5: [451937, 230524, 5652, 38755],
      6: [503786, 199713, 9073, 24185],
      7: [501494, 170648, 5493, 33604],
      8: [367345, 172619, 6676, 16032],
      9: [485936, 78477, 4519, 17317],
      10: [606071, 190274, 13014, 30111],
      11: [289282, 71603, 20382, 28002],
      12: [377324, 131616, 6699, 15538],
      13: [407414, 125749, 25153, 11617],
      size: 14
    };
    const ncOld = {
      0: [427646, 124340, 3891, 45498],
      1: [425698, 79987, 3767, 40212],
      2: [655502, 210832, 6332, 26916],
      3: [440157, 104978, 7475, 15728],
      4: [361328, 111143, 36171, 7544],
      5: [483110, 187503, 12007, 26117],
      6: [618411, 181408, 11172, 29758],
      7: [308956, 120805, 6303, 28426],
      8: [356815, 82601, 10683, 14772],
      9: [424753, 223997, 8430, 20493],
      10: [502212, 191422, 7246, 23432],
      11: [501830, 153112, 4349, 23894],
      12: [623066, 245783, 8179, 23884],
      size: 13
    };
    const ncProposed = {
      0: [358975, 122306, 4027, 16377],
      1: [399522, 111410, 27988, 12642],
      2: [409100, 103675, 13216, 24657],
      3: [498604, 148872, 4769, 20267],
      4: [541172, 231628, 7454, 22969],
      5: [421327, 135997, 5279, 24801],
      6: [360938, 188251, 7861, 46062],
      7: [588159, 215147, 7645, 28920],
      8: [511496, 211887, 22107, 22691],
      9: [508027, 227466, 6448, 52052],
      10: [503598, 141305, 4795, 18115],
      11: [603370, 116655, 5199, 16431],
      12: [495172, 107122, 4012, 22190],
      13: [647974, 200802, 13259, 31254],
      size: 14
    };

    if (store.currentState){
      let state = store.currentState;
      switch(state){
        case 'TN':
          stateId=1;
          enactedData=tnEnacted;
          oldData=tnOld;
          proposedData=null;
          break;
        case 'MS':
          stateId=2;
          enactedData=msEnacted;
          oldData=msOld;
          proposedData=msProposed;
          break;
        case 'NC':
          stateId=3;
          enactedData=ncEnacted;
          oldData=ncOld;
          proposedData=ncProposed;
          break;
        default:
          break;
      }
    }

    // if(stateId !== null && !enactedSet){
    //   fetch(`http://localhost:8080/getDemographics?stateID=${stateId}&planType=${"enacted"}`).then(response => response.json()).then((response) => {setEnactedDemographics(response)});
    // }
    // if(stateId !== null && !oldSet){
    //   fetch(`http://localhost:8080/getDemographics?stateID=${stateId}&planType=${"old"}`).then(response => response.json()).then((response) => {setOldDemographics(response)});
    // }
    // if(stateId !== null && !proposedSet){
    //   if(stateId !== 1 && !proposedSet){
    //     fetch(`http://localhost:8080/getDemographics?stateID=${stateId}&planType=${"proposed"}`).then(response => response.json()).then((response) => {setProposedDemographics(response)});
    //   } else{
    //     setProposed(true);
    //   }
    // }

    // if(stateId !== null && (enactedSet===false || oldSet===false || (stateId!==1 && proposedSet===false))) {
    //   if (!enactedSet){
    //     fetch(`http://localhost:8080/getDemographics?stateID=${stateId}&planType=${"enacted"}`).then(response => response.json()).then((response) => {setEnactedDemographics(response)});
    //   }
    //   if(!oldSet){
    //     fetch(`http://localhost:8080/getDemographics?stateID=${stateId}&planType=${"old"}`).then(response => response.json()).then((response) => {setOldDemographics(response)});
    //   }
    //   if(stateId !== 1 && !proposedSet){
    //     fetch(`http://localhost:8080/getDemographics?stateID=${stateId}&planType=${"proposed"}`).then(response => response.json()).then((response) => {setProposedDemographics(response)});
    //   } else{
    //     setProposed(true);
    //   }
    //   // if (enactedData && oldData && proposedData){
    //   //   if (enactedData.length>0){
    //   //     setEnacted(true);
    //   //   }
    //   //   if (oldData.length>0){
    //   //     setOld(true);
    //   //   }
    //   //   if (proposedData.length>0 || stateId===1){
    //   //     setProposed(true);
    //   //   }
    //   // }
    // }

    var enacted = {
      asian:[],
      black:[],
      native:[],
      white:[],
      //other:[]
    };

    var old = {
      asian:[],
      black:[],
      native:[],
      white:[],
      //other:[]
    };

    var proposed = {
      asian:[],
      black:[],
      native:[],
      white:[],
      //other:[]
    };
    //if(enactedData){
    if (stateId !== null){
      for(let i=0; i<enactedData.size; i++) {
        enacted.asian.push(enactedData[i][3]);
        enacted.black.push(enactedData[i][1]);
        enacted.native.push(enactedData[i][2]);
        enacted.white.push(enactedData[i][0]);
        //enacted.other.push(enactedData[i].totalPop-(enactedData[i].asianPop+enactedData[i].whitePop+enactedData[i].blackPop+enactedData[i].natvePop));
      }
      for(let i=0; i<oldData.size; i++) {
        old.asian.push(oldData[i][3]);
        old.black.push(oldData[i][1]);
        old.native.push(oldData[i][2]);
        old.white.push(oldData[i][0]);
      }
      if (stateId !== 1) {
        for(let i=0; i<proposedData.size; i++) {
          proposed.asian.push(proposedData[i][3]);
          proposed.black.push(proposedData[i][1]);
          proposed.native.push(proposedData[i][2]);
          proposed.white.push(proposedData[i][0]);
        }
        //setProposed(true);
      }
    }

    const enactedGraphData = 
    [{
        name: 'White',
        data: enacted.white
      }, {
        name: 'Black',
        data: enacted.black
      }, {
        name: 'Native',
        data: enacted.native
      }, {
        name: 'Asian',
        data: enacted.asian
      }];
    
    const oldGraphData = [{
        name: 'White',
        data: old.white
      }, {
        name: 'Black',
        data: old.black
      }, {
        name: 'Native',
        data: old.native
      }, {
        name: 'Asian',
        data: old.asian
      }];

   if (stateId !== 1) {
    proposedGraphData = 
    [{
        name: 'White',
        data: proposed.white
      }, {
        name: 'Black',
        data: proposed.black
      }, {
        name: 'Native',
        data: proposed.native
      }, {
        name: 'Asian',
        data: proposed.asian
      }];
   } else {
     proposedGraphData=null;
   }

    const categories = store.currentState==='TN'? tnCategories : (store.currentState==='MS' ? msCategories : ncCategories);


    let enactedGraph = {
        series: enactedGraphData,
        options: {
          chart: {
            id: 'bar-chart',
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%',
            foreColor: 'white'
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          xaxis: {
            style: {
                color: 'rgb(255,255,255)'
            },
            categories: categories
        },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'right',
            offsetX: 0,
            offsetY: 50,
            color: 'white'
          },
        },
      };

      let oldGraph = {
        series: oldGraphData,
        options: {
          chart: {
            id: 'bar-chart',
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%',
            foreColor: 'white'
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          xaxis: {
            style: {
                color: 'rgb(255,255,255)'
            },
            categories: (store.currentState==='NC' ? oldNcCategories : categories)
        },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'right',
            offsetX: 0,
            offsetY: 50,
            color: 'white'
          },
        },
      };
      if (stateId !== 1) {
        proposedGraph = {
          series: proposedGraphData,
          options: {
            chart: {
              id: 'bar-chart',
              type: 'bar',
              height: 350,
              stacked: true,
              stackType: '100%',
              foreColor: 'white'
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
            xaxis: {
              style: {
                  color: 'white',
              },
              categories: categories
          },
            fill: {
              opacity: 1
            },
            legend: {
              position: 'right',
              offsetX: 0,
              offsetY: 50,
              color: 'white'
            },
          },
        };
      } else {
        proposedGraph = null;
      }

    if (store.currentState) {
        switch(store.currentState) {
            case "TN":
                graph = enactedGraph;
                break;
            case "MS":
                graph = proposedGraph;
                break;
            case "NC":
                graph = oldGraph;
                break;
            default:
                graph = null;
                break;
        }
    }
    if (graph) {
        return (
            <div id="pop-chart">
                <ReactApexChart id="bar-chart" options={graph.options} series={graph.series} type="bar" height={'150%'} />
            </div>
        );
    }
    else {
        return (
            <div id="pop-chart">
            </div>
        );
    }
}

export default PopulationGraph;