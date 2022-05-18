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
    var  proposedGraph;
    const tnCategories = ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9"];
    const oldNcCategories = ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9", "District 10", "District 11", "District 12", "District 13"];
    const msCategories = ["District 1", "District 2", "District 3", "District 4"];
    const ncCategories = ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9", "District 10", "District 11", "District 12", "District 13", "District 14"];
    // const [oldData, setOldDemographics] = React.useState(null);
    // const [enactedData, setEnactedDemographics] = React.useState(null);
    // const [proposedData, setProposedDemographics] = React.useState(null);
    const [enactedData, setEnactedData] = React.useState(null);
    const [oldData, setOldData] = React.useState(null);
    const [proposedData, setProposedData] = React.useState(null);
    const [dataSet, setData] = React.useState(false);
    const [enactedSet, setEnacted] = React.useState(false);
    const [oldSet, setOld] = React.useState(false);
    const [proposedSet, setProposed] = React.useState(false);
    const [enactedGraphData, setEnactedGraph] = React.useState(null);
    const [oldGraphData, setOldGraph] = React.useState(null);
    const [proposedGraphData, setProposedGraph] = React.useState(null);
    const [stateId, setStateId] = React.useState(0);
    // let stateId=null;

    const getDemographics = async function (planType){
      const response = await fetch(`http://localhost:8080/getDemographics?stateID=${store.stateObj.id}&planType=${planType}`);
      const json = await response.json();
      switch(planType) {
        case "enacted":
          setEnactedData(json);
          break;
        case "proposed":
          setProposedData(json);
          break;
        case "old":
          setOldData(json);
          break;
        default:
          break;
      }
  }

  if (store.stateObj){
    if (store.stateObj.id !== stateId) {
      setData(false);
      setStateId(store.stateObj.id);
    }
  }

  if (store.stateObj && !dataSet) {
    let state = store.stateObj;
    //setStateId(state.id);
    if (state.id === 1) {
      getDemographics('enacted');
      getDemographics('old');
    }
    else {
      getDemographics('enacted');
      getDemographics('old');
      getDemographics('proposed');
    }
    if (state.id === 1) {
      if (enactedData && oldData) {
        setData(true);
      }
    }
    else if (enactedData && oldData && proposedData){
      setData(true);
    }
  }

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

    let data = {
      enacted: null,
      old: null,
      proposed: null
    };

    if (enactedData){
      for(let i=0; i<enactedData.length; i++) {
        enacted.asian.push(enactedData[i].asianPop);
        enacted.black.push(enactedData[i].blackPop);
        enacted.native.push(enactedData[i].nativePop);
        enacted.white.push(enactedData[i].whitePop);
        //enacted.other.push(enactedData[i].totalPop-(enactedData[i].asianPop+enactedData[i].whitePop+enactedData[i].blackPop+enactedData[i].natvePop));
      }
      let enactedd = 
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
      data.enacted = enactedd;
    }
    if (oldData) {
      for(let i=0; i<oldData.length; i++) {
        old.asian.push(oldData[i].asianPop);
        old.black.push(oldData[i].blackPop);
        old.native.push(oldData[i].nativePop);
        old.white.push(oldData[i].whitePop);
      }
      let oldd = [{
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
      data.old = oldd;
    }
    if (proposedData) {
      for(let i=0; i<proposedData.length; i++) {
        proposed.asian.push(proposedData[i][3]);
        proposed.black.push(proposedData[i][1]);
        proposed.native.push(proposedData[i][2]);
        proposed.white.push(proposedData[i][0]);
      }
      let proposedd = 
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
      data.proposed = proposedd;
    }
      // if (stateId !== 1) {
      //   for(let i=0; i<proposedData.size; i++) {
      //     proposed.asian.push(proposedData[i][3]);
      //     proposed.black.push(proposedData[i][1]);
      //     proposed.native.push(proposedData[i][2]);
      //     proposed.white.push(proposedData[i][0]);
      //   }
      //   //setProposed(true);
      // }

    const categories = stateId===1? tnCategories : (stateId===2 ? msCategories : ncCategories);


    let enactedGraph = {
        series: data.enacted,
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
        series: data.old,
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
          series: data.proposed,
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
    switch(props.plan){
      case 'enacted':
        if (enactedGraph.series !== null) {
          graph = enactedGraph;
        }
        break;
      case 'old':
        if (oldGraph.series !== null) {
          graph = oldGraph;
        }
        break;
      case 'proposed':
        if (proposedGraph.series !== null) {
          graph = proposedGraph;
        }
        break;
      default:
        break;
    }

    if (graph) {
        return (
            <div id="pop-chart">
                <ReactApexChart id="bar-chart" options={graph.options} series={graph.series} type="bar" height={'400px'} />
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